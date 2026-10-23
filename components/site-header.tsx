"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Phone, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { EnquiryTrigger } from "@/components/enquiry/enquiry-trigger"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70">
      {/*
       * The blur lives on this inner layer, not on <header>.
       *
       * `backdrop-filter` makes an element the containing block for its
       * `position: fixed` descendants, so the mobile panel below was being
       * sized against the 64px header instead of the viewport and opened with
       * zero height. Keeping the filter off <header> keeps that panel fixed to
       * the viewport while preserving the frosted look.
       */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-background/85 backdrop-blur-md" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active ? "text-primary-foreground" : "text-foreground/75 hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <EnquiryTrigger
            source="header"
            className="hidden border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground sm:inline-flex"
          >
            Enquiry
          </EnquiryTrigger>
          <a
            href={site.phoneMainHref}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep lg:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phoneMain}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-ink-foreground md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          /* The header bar is h-16 below `sm` and h-18 from `sm` up. Without the
             `sm:top-18` the panel overlapped the bar by 8px between 640-768px. */
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-6 text-ink-foreground sm:top-18 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.05 }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-5 font-display text-3xl font-bold",
                        isActive(pathname, item.href) ? "text-primary-bright" : "text-ink-foreground",
                      )}
                    >
                      {item.label}
                      <span className="text-sm font-medium text-white/55">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <EnquiryTrigger
                source="mobile-menu"
                className="w-full bg-white text-ink hover:bg-white/90"
                onClick={() => setOpen(false)}
              >
                Send an enquiry
              </EnquiryTrigger>
              <a
                href={site.phoneMainHref}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {site.phoneMain}
              </a>
              <a href={`mailto:${site.email}`} className="text-center text-sm text-white/60">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
