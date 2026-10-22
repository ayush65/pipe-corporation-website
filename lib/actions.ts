"use server"

import { headers } from "next/headers"
import {
  enquiryHtml,
  enquiryPlainText,
  enquirySubject,
  readEnquiryFields,
  validateEnquiry,
  type EnquiryState,
} from "@/lib/enquiry"
import { site } from "@/lib/site"

/**
 * Sends a website enquiry to the Pipe Corporation inbox.
 *
 * Delivery uses the Resend HTTP API (https://resend.com) — one API key, no
 * extra dependency and no SMTP credentials to rotate. Set `RESEND_API_KEY` in
 * the deployment environment to turn delivery on.
 *
 * A Server Action is a public endpoint: anyone can POST to it. So this
 * function treats every field as untrusted and re-validates from scratch,
 * rate-limits by IP, and drops anything that fills the honeypot.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails"
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5

/**
 * Best-effort per-IP throttle.
 *
 * On Vercel each serverless instance keeps its own map, so this is not a
 * hard guarantee — it still stops a single visitor from looping the endpoint
 * and burning the mail quota.
 */
const rateLimitHits = new Map<string, number[]>()

function isRateLimited(key: string) {
  const now = Date.now()
  const recent = (rateLimitHits.get(key) ?? []).filter((hit) => now - hit < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(key, recent)
    return true
  }
  recent.push(now)
  rateLimitHits.set(key, recent)
  return false
}

async function clientIp() {
  try {
    const requestHeaders = await headers()
    return requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  } catch {
    return "unknown"
  }
}

export async function sendEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  /*
   * Honeypot. The field is hidden from people but not from bots, which fill
   * in every input they can find. Answer as though it succeeded so a bot
   * learns nothing about the filter.
   */
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", message: "Thanks — we've received your enquiry." }
  }

  const data = readEnquiryFields(formData)
  const errors = validateEnquiry(data)
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", message: "Please check the highlighted fields.", errors }
  }

  if (isRateLimited(await clientIp())) {
    return {
      status: "failed",
      message: "Too many enquiries from this device. Please try again in a minute, or call us.",
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    /*
     * No mail provider configured yet. The client turns this into a WhatsApp
     * hand-off so the enquiry still reaches the sales desk.
     */
    return {
      status: "unconfigured",
      message: "Email delivery is being set up. Send it on WhatsApp and we'll pick it up right away.",
    }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? "Pipe Corporation <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO_EMAIL ?? site.email],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: enquirySubject(data),
        text: enquiryPlainText(data),
        html: enquiryHtml(data),
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => "")
      console.error("[enquiry] Resend rejected the email", response.status, detail.slice(0, 500))
      return {
        status: "failed",
        message: "We couldn't send that just now. Please try WhatsApp or call us on " + site.phoneMain + ".",
      }
    }
  } catch (error) {
    console.error("[enquiry] sending the email failed", error)
    return {
      status: "failed",
      message: "We couldn't send that just now. Please try WhatsApp or call us on " + site.phoneMain + ".",
    }
  }

  const firstName = data.name.split(/\s+/)[0]
  return {
    status: "success",
    message: `Thanks ${firstName} — your enquiry is with our team. We'll call you back shortly.`,
  }
}
