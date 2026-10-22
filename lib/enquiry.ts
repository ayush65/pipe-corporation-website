/**
 * Shared enquiry model.
 *
 * This module is imported by both the client form and the server action, so it
 * must stay free of Node-only APIs. Keeping the validation here means the
 * browser and the server agree on what a valid enquiry is — the server always
 * re-validates, because a Server Action is an untrusted public endpoint.
 */

export type EnquiryData = {
  name: string
  phone: string
  email: string
  city: string
  category: string
  message: string
}

export type EnquiryFieldName = keyof EnquiryData

export type EnquiryErrors = Partial<Record<EnquiryFieldName, string>>

export type EnquiryState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "invalid"; message: string; errors: EnquiryErrors }
  | { status: "failed"; message: string }
  /**
   * The form was valid but no mail provider is configured on the server yet.
   * The client responds by offering the WhatsApp hand-off so the lead is
   * never lost.
   */
  | { status: "unconfigured"; message: string }

export const enquiryInitialState: EnquiryState = { status: "idle" }

/** Names of the fields the server is willing to read from a submission. */
export const ENQUIRY_FIELD_NAMES: EnquiryFieldName[] = [
  "name",
  "phone",
  "email",
  "city",
  "category",
  "message",
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Digits, spaces and the usual separators — enough to catch typos without
 *  rejecting valid international formats. */
const PHONE_PATTERN = /^[+()\d][\d\s()+-]{6,19}$/

export function readEnquiryFields(formData: FormData): EnquiryData {
  const get = (key: string) => String(formData.get(key) ?? "").trim()
  return {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    city: get("city"),
    category: get("category"),
    message: get("message"),
  }
}

export function validateEnquiry(data: EnquiryData): EnquiryErrors {
  const errors: EnquiryErrors = {}

  if (!data.name) errors.name = "Please enter your name."
  else if (data.name.length < 2) errors.name = "That name looks too short."
  else if (data.name.length > 80) errors.name = "Please keep the name under 80 characters."

  if (!data.phone) errors.phone = "Please enter a phone number."
  else if (!PHONE_PATTERN.test(data.phone)) errors.phone = "Please enter a valid phone number."

  if (data.email && !EMAIL_PATTERN.test(data.email)) errors.email = "Please enter a valid email address."
  if (data.city.length > 60) errors.city = "Please keep the city under 60 characters."
  if (data.category.length > 60) errors.category = "Please keep the category under 60 characters."

  if (!data.message) errors.message = "Tell us what you need, even briefly."
  else if (data.message.length < 5) errors.message = "Please add a little more detail."
  else if (data.message.length > 2000) errors.message = "Please keep it under 2000 characters."

  return errors
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;"
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case '"':
        return "&quot;"
      default:
        return "&#39;"
    }
  })
}

export function enquirySubject(data: EnquiryData) {
  const topic = data.category || "General enquiry"
  return `Website enquiry — ${data.name} — ${topic}`
}

export function enquiryPlainText(data: EnquiryData) {
  const lines = [`Name: ${data.name}`, `Phone: ${data.phone}`]
  if (data.email) lines.push(`Email: ${data.email}`)
  if (data.city) lines.push(`City: ${data.city}`)
  if (data.category) lines.push(`Category: ${data.category}`)
  lines.push("", "Requirement:", data.message)
  return lines.join("\n")
}

export function enquiryHtml(data: EnquiryData) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
  ]
  if (data.email) rows.push(["Email", data.email])
  if (data.city) rows.push(["City", data.city])
  if (data.category) rows.push(["Category", data.category])

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;font:400 14px Arial,Helvetica,sans-serif">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#111827;font:600 14px Arial,Helvetica,sans-serif">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("")

  return [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111827">',
    '<p style="margin:0 0 14px">New enquiry received from the Pipe Corporation website.</p>',
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${table}</table>`,
    '<p style="margin:18px 0 4px;font:600 14px Arial,Helvetica,sans-serif">Requirement</p>',
    `<p style="margin:0;white-space:pre-wrap;line-height:1.55">${escapeHtml(data.message)}</p>`,
    "</div>",
  ].join("")
}

export function enquiryWhatsAppText(data: EnquiryData) {
  const lines = ["Hello Pipe Corporation,", "", `Name: ${data.name}`, `Phone: ${data.phone}`]
  if (data.email) lines.push(`Email: ${data.email}`)
  if (data.city) lines.push(`City: ${data.city}`)
  if (data.category) lines.push(`Category: ${data.category}`)
  lines.push("", `Requirement: ${data.message}`)
  return lines.join("\n")
}
