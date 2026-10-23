import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { CatalogueSearch } from "@/components/products/catalogue-search"
import { CategoryTabs } from "@/components/products/category-tabs"
import { Reveal } from "@/components/reveal"
import { catalogueEntries, categories, countProducts } from "@/lib/catalog"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Explore Pipe Corporation's Sanitary & Plumbing and Agriculture & Engineering product ranges — pipes, fittings, taps, valves, flanges and more.",
  path: "/products",
})

export default function ProductsPage() {
  const total = categories.reduce((s, c) => s + countProducts(c), 0)
  const entries = catalogueEntries()

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Choose a category to explore."
        description="Two sectors, dozens of ranges and 7,000+ SKUs. Select a category to see every product, then tap enquire for pricing."
        crumbs={[{ href: "/", label: "Home" }, { label: "Products" }]}
      >
        <CategoryTabs
          active="all"
          items={[
            { slug: "all", label: "All", count: total },
            ...categories.map((c) => ({ slug: c.slug, label: c.title, count: countProducts(c) })),
          ]}
        />
      </PageHero>

      <CatalogueSearch entries={entries} />

      <section aria-label="Product categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                <Link href={`/products/${c.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src={c.cover}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <span className="sr-only">View {c.title}</span>
                </Link>
                <div className="flex flex-1 flex-col gap-5 border-t border-border p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {countProducts(c)} products · {c.groups.length} ranges
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                        <Link href={`/products/${c.slug}`} className="hover:text-primary">
                          {c.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{c.description}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {c.groups.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/products/${c.slug}#${g.slug}`}
                          className="inline-block rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                        >
                          {g.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products/${c.slug}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
                  >
                    View all {c.shortTitle} products
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
