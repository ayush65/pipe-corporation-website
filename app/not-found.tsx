import Link from "next/link"
import { ArrowRight, Phone, Search } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { PageHero } from "@/components/page-hero"
import { categories } from "@/lib/catalog"
import { site, whatsappLink } from "@/lib/site"

export const metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
}

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404 · Page not found"
        title="This pipe leads nowhere."
        description="The page you are looking for has been moved, renamed, or never existed. Let us point you back to the right range."
        crumbs={[{ href: "/", label: "Home" }, { label: "Not found" }]}
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold">What were you looking for?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Most visitors land here after following an old link. Try one of these instead.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/products/${c.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border px-5 py-4 transition-colors hover:border-primary/50"
                    >
                      <span>
                        <span className="block font-display text-lg font-bold">{c.title}</span>
                        <span className="block text-sm text-muted-foreground">{c.tagline}</span>
                      </span>
                      <ArrowRight
                        className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
                >
                  <Search className="size-4" aria-hidden="true" />
                  Browse all products
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground/40"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-3xl bg-ink p-6 text-ink-foreground sm:p-8">
              <h2 className="font-display text-xl font-extrabold">Cannot find what you need?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We stock 7,000+ SKUs across plumbing, sanitary and agriculture. Send us the requirement and
                we will locate it for you.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappLink("Hello Pipe Corporation, I am looking for a product that I could not find on your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
                >
                  <FaWhatsapp className="size-4" aria-hidden="true" />
                  Ask on WhatsApp
                </a>
                <a
                  href={site.phoneMainHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phoneMain}
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold">Popular pages</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {[
                  { href: "/products", label: "All products" },
                  { href: "/products/sanitary-plumbing", label: "Sanitary & plumbing" },
                  { href: "/products/agriculture-engineering", label: "Agriculture & engineering" },
                  { href: "/about", label: "Our story" },
                  { href: "/contact", label: "Contact us" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
