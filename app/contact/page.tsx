import type { Metadata } from "next"
import { Building2, Mail, MapPin, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { ContactForm } from "@/components/contact/contact-form"
import { Faq } from "@/components/home/faq"
import { categories } from "@/lib/catalog"
import { site, whatsappLink } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact Pipe Corporation, Hyderabad. Call ${site.phoneMain}, office ${site.phoneOffice}, or WhatsApp us for pricing.`,
  path: "/contact",
})

const channels = [
  { icon: Phone, label: "Main", value: site.phoneMain, href: site.phoneMainHref },
  { icon: Building2, label: "Office", value: site.phoneOffice, href: site.phoneOfficeHref },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: site.whatsapp,
    href: whatsappLink("Hello Pipe Corporation, I have an enquiry."),
    external: true,
  },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk about your requirement."
        description="Call, WhatsApp or send us your list. Our team will respond with pricing and availability."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />
      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col gap-4">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((c, i) => (
                <li key={c.label}>
                  <Reveal delay={i * 0.06}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-ink-foreground transition-colors group-hover:bg-primary">
                        <c.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                        <span className="block truncate font-display text-lg font-bold">{c.value}</span>
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.25} className="flex items-start gap-4 rounded-2xl bg-ink p-5 text-ink-foreground">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-white/50">Location</span>
                <span className="block font-display text-lg font-bold">{site.city}</span>
                <span className="mt-1 block text-sm text-white/60">Serving Telangana &amp; neighbouring states</span>
              </span>
            </Reveal>
            <Reveal delay={0.3} className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Business hours</h2>
              <dl className="mt-3 flex flex-col gap-2 text-sm">
                {site.hoursDisplay.map((h) => (
                  <div key={h.label} className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{h.label}</dt>
                    <dd className="font-semibold tabular-nums">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm categoryTitles={categories.map((c) => c.title)} />
          </Reveal>
        </div>
      </section>
      <Faq />
    </>
  )
}
