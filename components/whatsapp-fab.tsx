"use client"

import { motion, useReducedMotion } from "motion/react"
import { FaWhatsapp } from "react-icons/fa"
import { whatsappLink } from "@/lib/site"

/**
 * Floating WhatsApp button — logo only, no text.
 *
 * The glyph is the real WhatsApp brand mark (Font Awesome's `fa-whatsapp`,
 * shipped through `react-icons/fa`) rendered in the official WhatsApp green
 * `#25D366` from https://brand.whatsapp.com. Because the official mark is the
 * green glyph on white, the button is a white disc rather than the brand
 * crimson pill it used to be — recolouring the glyph to the site palette
 * would have destroyed the thing that makes it recognisable.
 *
 * The white disc also keeps the glyph legible against both the light and
 * dark sections of the site.
 */
export function WhatsAppFab() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={whatsappLink("Hello Pipe Corporation, I have an enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      /* The visible label is gone, so the link needs an accessible name. */
      aria-label="Chat with us on WhatsApp"
      /* Scale-only entrance: an opacity fade would transiently blend the
         button colour with the page behind it and break contrast. */
      initial={reduceMotion ? false : { scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.4, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-white text-[#25D366] shadow-lg shadow-black/25 ring-1 ring-black/5 transition-shadow duration-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <FaWhatsapp className="size-7" aria-hidden="true" />
    </motion.a>
  )
}
