"use server"

import { headers } from "next/headers"
import {
  readEnquiryFields,
  validateEnquiry,
  type EnquiryState,
} from "@/lib/enquiry"
import { sendEnquiryEmail } from "@/lib/mail"
import { site } from "@/lib/site"

/**
 * Sends a website enquiry to the Pipe Corporation inbox.
 *
 * A Server Action is a public endpoint: anyone can POST to it. So this
 * function treats every field as untrusted and re-validates from scratch,
 * rate-limits by IP, and drops anything that fills the honeypot.
 */

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

  const result = await sendEnquiryEmail(data)

  if (!result.ok) {
    if (!result.configured) {
      /*
       * No mail provider configured yet. The client turns this into a
       * WhatsApp hand-off so the enquiry still reaches the sales desk.
       */
      return {
        status: "unconfigured",
        message: "Email delivery is being set up. Send it on WhatsApp and we'll pick it up right away.",
      }
    }
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
