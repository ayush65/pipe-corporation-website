import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { CategoryTabs } from "@/components/products/category-tabs"
import { ProductBrowser } from "@/components/products/product-browser"
import { categories, countProducts, getCategory } from "@/lib/catalog"
import { pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const c = getCategory(category)
  if (!c) return {}
  return pageMetadata({
    title: c.title,
    description: c.description,
    path: `/products/${c.slug}`,
    keywords: [
      c.title,
      `${c.shortTitle} fittings`,
      "pipes and fittings",
      "Hyderabad",
    ],
  })
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) notFound()

  const total = categories.reduce((s, x) => s + countProducts(x), 0)

  return (
    <>
      <PageHero
        eyebrow={c.tagline}
        title={c.title}
        description={c.description}
        crumbs={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { label: c.title }]}
      >
        <CategoryTabs
          active={c.slug}
          items={[
            { slug: "all", label: "All", count: total },
            ...categories.map((x) => ({ slug: x.slug, label: x.title, count: countProducts(x) })),
          ]}
        />
      </PageHero>
      <ProductBrowser key={c.slug} groups={c.groups} categorySlug={c.slug} />
      <CtaBand />
    </>
  )
}
