"use client"

import { motion, useReducedMotion } from "motion/react"
import { FaWhatsapp } from "react-icons/fa"
import { whatsappLink } from "@/lib/site"

/**
 * Official WhatsApp brand green (https://brand.whatsapp.com). The glyph is
 * rendered from the Font Awesome brand set via react-icons so it is the real
 * WhatsApp mark rather than a generic chat bubble.
 */
const WHATSAPP_GREEN = "#25D366"

export function WhatsAppFab() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={whatsappLink("Hello Pipe Corporation, I have an enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      /* Scale-only entrance: an opacity fade would transiently blend the pill
         colour with the page behind it and break contrast. */
      initial={reduceMotion ? false : { scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.4, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-primary py-2.5 pl-2.5 pr-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background"
    >
      {/* The official mark is the green glyph on white — so it sits in its own
          white disc rather than being recoloured to fit the button. */}
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white">
        <FaWhatsapp className="size-5" style={{ color: WHATSAPP_GREEN }} aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">WhatsApp us</span>
      <span className="sr-only sm:hidden">Chat on WhatsApp</span>
    </motion.a>
  )
}
