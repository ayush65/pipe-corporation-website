import { Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { EnquiryTrigger } from "@/components/enquiry/enquiry-trigger"
import { Reveal } from "@/components/reveal"
import { site, whatsappLink } from "@/lib/site"

export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="bg-background px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full border-[28px] border-white/10" />
        <div aria-hidden="true" className="absolute -bottom-32 right-32 size-64 rounded-full border-[20px] border-black/10" />
        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-xl">
            <h2 id="cta-heading" className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Need a quote? We reply fast.
            </h2>
            <p className="mt-3 text-white/90">
              Send us your list on WhatsApp or call — our team will share pricing and availability.
            </p>
          </div>
          {/*
           * The buttons size to their label and never shrink below it —
           * without `whitespace-nowrap` they were being squeezed by the text
           * column and broke "Get a quote" onto two lines at every width.
           * `flex-wrap` lets the row fall onto a second line when a tablet
           * cannot fit all three, instead of crushing each one.
           */}
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap xl:shrink-0">
            <EnquiryTrigger
              source="cta-band"
              className="whitespace-nowrap bg-white px-5 py-3.5 text-ink hover:bg-white/90"
            >
              Get a quote
            </EnquiryTrigger>
            <a
              href={whatsappLink("Hello Pipe Corporation, I would like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-black"
            >
              <FaWhatsapp className="size-4" aria-hidden="true" />
              WhatsApp {site.whatsapp}
            </a>
            <a
              href={site.phoneOfficeHref}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              <Phone className="size-4" aria-hidden="true" />
              Office {site.phoneOffice}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
