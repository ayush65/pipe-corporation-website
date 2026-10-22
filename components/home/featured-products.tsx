import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { categories, productPath } from "@/lib/catalog"

function pickFeatured() {
  const picks: {
    product: (typeof categories)[number]["groups"][number]["products"][number]
    group: string
    groupSlug: string
    categorySlug: string
  }[] = []
  for (const c of categories) {
    for (const g of c.groups.slice(0, 4)) {
      const p = g.products.find((x) => !/group|mix/i.test(x.image)) ?? g.products[0]
      if (p) picks.push({ product: p, group: g.title, groupSlug: g.slug, categorySlug: c.slug })
    }
  }
  return picks.slice(0, 8)
}

export function FeaturedProducts() {
  const featured = pickFeatured()
  return (
    <section aria-labelledby="featured-heading" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title={<span id="featured-heading">Popular picks from our range</span>}
          description="A glimpse of what our dealers and contractors order most. Tap enquire to get pricing on WhatsApp."
        />
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {featured.map(({ product, group, groupSlug, categorySlug }, i) => (
            <li key={product.id}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <ProductCard
                  product={product}
                  groupTitle={group}
                  href={productPath(categorySlug, groupSlug, product.slug)}
                />
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
          >
            Browse all products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
