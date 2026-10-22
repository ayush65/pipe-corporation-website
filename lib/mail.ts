import nodemailer from "nodemailer"
import {
  enquiryHtml,
  enquiryPlainText,
  enquirySubject,
  type EnquiryData,
} from "@/lib/enquiry"
import { site } from "@/lib/site"

/**
 * Delivery of website enquiries by email.
 *
 * Two providers are supported, tried in this order:
 *
 * 1. **SMTP** — any standard mail server (Gmail, Zoho, your own host).
 *    Configured with `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS`.
 * 2. **Resend** — the HTTP API, enabled with `RESEND_API_KEY`. Used as a
 *    fallback when SMTP is unreachable, so a flaky mail server cannot cost
 *    us an enquiry.
 *
 * With neither configured the form hands the enquiry to WhatsApp instead, so
 * a lead is never lost.
 */

export type MailResult =
  | { ok: true; provider: "smtp" | "resend" }
  /** Nothing is configured — the caller should offer the WhatsApp hand-off. */
  | { ok: false; configured: false }
  | { ok: false; configured: true; provider: string; detail: string }

type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  auth: { user: string; pass: string }
}

function describeError(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = (process.env.SMTP_PASS ?? process.env.EMAIL_PASSWORD)?.trim()
  if (!host || !user || !pass) return null

  const port = Number(process.env.SMTP_PORT ?? 587)
  return {
    host,
    port: Number.isFinite(port) && port > 0 ? port : 587,
    // Port 465 is implicit TLS; 587 negotiates STARTTLS.
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  }
}

/**
 * The sender shown to the recipient. Some servers (Gmail among them) only
 * accept a From address that matches the authenticated account, so this
 * defaults to the SMTP user rather than the public site address.
 */
function fromAddress() {
  const address = (process.env.EMAIL ?? process.env.SMTP_USER)?.trim() || site.email
  // Collapse the odd whitespace that creeps into copied env values.
  const name = (process.env.EMAIL_NAME ?? "Pipe Corporation").trim().replace(/\s+/g, " ")
  return `${name} <${address}>`
}

function recipients() {
  const raw =
    process.env.RECIPIENT_EMAIL ?? process.env.ENQUIRY_TO_EMAIL ?? site.email
  return raw
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean)
}

async function deliverSmtp(data: EnquiryData, config: SmtpConfig) {
  const transporter = nodemailer.createTransport(config)
  await transporter.sendMail({
    from: fromAddress(),
    to: recipients(),
    ...(data.email ? { replyTo: data.email } : {}),
    subject: enquirySubject(data),
    text: enquiryPlainText(data),
    html: enquiryHtml(data),
  })
}

async function deliverResend(data: EnquiryData) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY is not set")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "Pipe Corporation <onboarding@resend.dev>",
      to: recipients(),
      ...(data.email ? { reply_to: data.email } : {}),
      subject: enquirySubject(data),
      text: enquiryPlainText(data),
      html: enquiryHtml(data),
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new Error(`Resend rejected the email ${response.status}: ${detail.slice(0, 500)}`)
  }
}

export async function sendEnquiryEmail(data: EnquiryData): Promise<MailResult> {
  const smtp = smtpConfig()

  if (smtp) {
    try {
      await deliverSmtp(data, smtp)
      return { ok: true, provider: "smtp" }
    } catch (error) {
      console.error("[enquiry] SMTP delivery failed", describeError(error))
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await deliverResend(data)
      return { ok: true, provider: "resend" }
    } catch (error) {
      console.error("[enquiry] Resend delivery failed", describeError(error))
    }
  }

  if (!smtp && !process.env.RESEND_API_KEY) {
    return { ok: false, configured: false }
  }

  return { ok: false, configured: true, provider: smtp ? "smtp" : "resend", detail: "delivery failed" }
}
