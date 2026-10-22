"use client"

import { motion, useReducedMotion } from "motion/react"
import { MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/site"

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
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary py-3.5 pl-4 pr-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp us</span>
      <span className="sr-only sm:hidden">Chat on WhatsApp</span>
    </motion.a>
  )
}
