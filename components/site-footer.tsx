import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { BrandLogo } from "@/components/brand-logo"
import { categories } from "@/lib/catalog"
import { nav, site, whatsappLink } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-5">
          <BrandLogo inverted />
          <p className="text-sm leading-relaxed text-white/60">
            A legacy of trust, quality and innovation since {site.since}. Distributors of plumbing, sanitary and
            agricultural solutions from Hyderabad.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Explore</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Categories</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="text-sm text-white/80 transition-colors hover:text-primary"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Contact</h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-white/80">
            <li>
              <a href={site.phoneMainHref} className="flex items-start gap-3 hover:text-primary">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-white/50">Main</span>
                  {site.phoneMain}
                </span>
              </a>
            </li>
            <li>
              <a href={site.phoneOfficeHref} className="flex items-start gap-3 hover:text-primary">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-white/50">Office</span>
                  {site.phoneOffice}
                </span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Hello Pipe Corporation, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-primary"
              >
                <FaWhatsapp className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-white/50">WhatsApp</span>
                  {site.whatsapp}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all hover:text-primary">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {site.city}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Pipe Corporation. All rights reserved.
          </p>
          <p>{site.founders.join(" · ")}</p>
        </div>
      </div>
    </footer>
  )
}
