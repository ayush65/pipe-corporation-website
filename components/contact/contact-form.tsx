"use client"

import { EnquiryForm } from "@/components/enquiry/enquiry-form"

/**
 * The contact page uses the same enquiry form as the popup dialog, so both
 * routes deliver by email (with a WhatsApp hand-off as the fallback) and
 * stay in step when the fields change.
 */
export function ContactForm({ categoryTitles }: { categoryTitles: string[] }) {
  return <EnquiryForm categoryTitles={categoryTitles} source="contact-page" />
}
