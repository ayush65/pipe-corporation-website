"use client"

import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry/enquiry-form"
import { useEnquiry } from "@/components/enquiry/enquiry-provider"

export function EnquiryDialog({ categoryTitles, source }: { categoryTitles: string[]; source: string }) {
  const { open, closeEnquiry } = useEnquiry()

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? undefined : closeEnquiry())}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm transition-opacity duration-200 data-open:opacity-100 data-closed:opacity-0"
          aria-hidden="true"
        />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-[60] max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-3xl border border-border bg-card p-5 shadow-2xl outline-none sm:p-7"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-2xl font-extrabold">Get a quote</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                Share your requirement — we reply with pricing and availability, usually the same working day.
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close enquiry form"
            >
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <EnquiryForm
            categoryTitles={categoryTitles}
            source={source}
            onDone={closeEnquiry}
            showWhatsApp={false}
            className="border-0 bg-transparent p-0"
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
