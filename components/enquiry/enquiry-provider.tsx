"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { EnquiryDialog } from "@/components/enquiry/enquiry-dialog"

/** How long the visitor has to settle in before the popup appears. */
const POPUP_DELAY_MS = 7000
/** Session flag so the popup never nags twice in the same browsing session. */
const POPUP_SEEN_KEY = "pipe-enquiry-popup-seen"

type EnquiryContextValue = {
  open: boolean
  /** Opens the enquiry dialog. `source` records where it was opened from. */
  openEnquiry: (source?: string) => void
  closeEnquiry: () => void
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) throw new Error("useEnquiry must be used inside <EnquiryProvider>")
  return context
}

export function EnquiryProvider({
  categoryTitles,
  children,
}: {
  categoryTitles: string[]
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState("button")

  const markSeen = useCallback(() => {
    try {
      window.sessionStorage.setItem(POPUP_SEEN_KEY, "1")
    } catch {
      // Private browsing modes can refuse sessionStorage — the popup then
      // simply shows again on the next page load, which is acceptable.
    }
  }, [])

  const openEnquiry = useCallback(
    (from = "button") => {
      markSeen()
      setSource(from)
      setOpen(true)
    },
    [markSeen],
  )

  const closeEnquiry = useCallback(() => setOpen(false), [])

  /*
   * The popup enquiry form.
   *
   * It appears 7 seconds after the page settles. It is skipped when:
   * - the visitor already opened or dismissed it in this session;
   * - the visitor is already on the contact page, where the same form is on
   *   screen permanently.
   */
  useEffect(() => {
    if (pathname === "/contact") return

    let seen = false
    try {
      seen = window.sessionStorage.getItem(POPUP_SEEN_KEY) === "1"
    } catch {
      seen = false
    }
    if (seen) return

    const timer = window.setTimeout(() => {
      markSeen()
      setSource("popup")
      setOpen(true)
    }, POPUP_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [pathname, markSeen])

  const value = useMemo<EnquiryContextValue>(
    () => ({ open, openEnquiry, closeEnquiry }),
    [open, openEnquiry, closeEnquiry],
  )

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryDialog categoryTitles={categoryTitles} source={source} />
    </EnquiryContext.Provider>
  )
}
