"use client"

import { useEnquiry } from "@/components/enquiry/enquiry-provider"
import { cn } from "@/lib/utils"

export function EnquiryTrigger({
  className,
  children = "Enquiry",
  source = "button",
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { source?: string }) {
  const { openEnquiry } = useEnquiry()

  return (
    <button
      type="button"
      /*
       * `onClick` is merged rather than spread, so a caller can add its own
       * behaviour (the mobile menu closes itself) without losing the open.
       * A plain `{...props}` spread after `onClick` would silently replace it.
       */
      onClick={(event) => {
        onClick?.(event)
        openEnquiry(source)
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
