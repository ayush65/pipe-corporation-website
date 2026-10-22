import Image from "next/image"
import Link from "next/link"
import { Phone, ShieldCheck, Truck, PackageCheck } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { StructuredData } from "@/components/structured-data"
import { productPath, type Category, type Product, type ProductGroup } from "@/lib/catalog"
import { absoluteUrl, productEnquiryLink, site } from "@/lib/site"

const highlights = [
  { icon: ShieldCheck, label: "Genuine stock", text: "Sourced directly from authorised brand partners." },
  { icon: PackageCheck, label: "Bulk enquiries", text: "Project and dealer quantities available on request." },
  { icon: Truck, label: "Fast dispatch", text: "Hyderabad delivery with dispatch across Telangana." },
]

export function ProductDetail({
  category,
  group,
  product,
  related,
}: {
  category: Category
  group: ProductGroup
  product: Product
  related: { product: Product; groupTitle: string; href: string }[]
}) {
  const path = productPath(category.slug, group.slug, product.slug)
  const enquiry = productEnquiryLink(product.title, `${group.title} · ${category.title}`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: absoluteUrl(product.image),
    sku: product.id,
    category: `${category.title} > ${group.title}`,
    brand: {
      "@type": "Brand",
      name: group.title,
    },
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      // NOTE: no `price`/`priceSpecification` — a PriceSpecification without a
      // `price` makes the Offer schema-invalid and Google drops the whole
      // Product rich result. Prices are quoted per enquiry, so we publish
      // availability + currency only.
      seller: {
        "@type": "Organization",
        name: site.name,
        "@id": `${site.url}/#organization`,
      },
      url: absoluteUrl(path),
    },
  }

  return (
    <>
      <StructuredData data={jsonLd} />

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            {/* The product photo is the LCP element — it must paint on the first
                frame, so it uses a transform-only entrance instead of a
                scroll-reveal that server-renders it at opacity 0. */}
            <div className="enter-up relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-white">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-8"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Range</p>
                  <p className="font-display text-sm font-bold">{group.title}</p>
                </div>
                <Link
                  href={`/products/${category.slug}#${group.slug}`}
                  className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
                >
                  View range
                </Link>
              </div>
            </div>

            <div className="enter-up flex flex-col gap-6" style={{ animationDelay: "80ms" }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{category.title}</p>
                <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  {product.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {product.description}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-3">
                {highlights.map((h) => (
                  <li key={h.label} className="rounded-2xl border border-border bg-card p-4">
                    <h.icon className="size-5 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-sm font-bold">{h.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.text}</p>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={enquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
                >
                  <FaWhatsapp className="size-4" aria-hidden="true" />
                  Get price &amp; availability
                </a>
                <a
                  href={site.phoneMainHref}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/40"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call {site.phoneMain}
                </a>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Prices vary by size, grade and quantity. Share your requirement on WhatsApp or call our office and we
                will confirm stock and dispatch timelines. Office: {site.phoneOffice}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-muted/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="You may also need"
              title={<span id="related-heading">Related products</span>}
              description="Other fittings from the same and neighbouring ranges."
            />
            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {related.map(({ product: p, groupTitle, href }, i) => (
                <li key={`${groupTitle}-${p.id}`}>
                  <Reveal delay={(i % 4) * 0.06} className="h-full">
                    <ProductCard product={p} groupTitle={groupTitle} href={href} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
