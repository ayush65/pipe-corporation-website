import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { ProductDetail } from "@/components/products/product-detail"
import { categories, getProduct, productPath, relatedProducts } from "@/lib/catalog"
import { pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return categories.flatMap((category) =>
    category.groups.flatMap((group) =>
      group.products.map((product) => ({
        category: category.slug,
        group: group.slug,
        product: product.slug,
      })),
    ),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; group: string; product: string }>
}): Promise<Metadata> {
  const { category, group, product } = await params
  const found = getProduct(category, group, product)
  if (!found) return {}

  const path = productPath(found.category.slug, found.group.slug, found.product.slug)

  return pageMetadata({
    title: found.product.title,
    description: found.product.description,
    path,
    image: found.product.image,
  })
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; group: string; product: string }>
}) {
  const { category, group, product } = await params
  const found = getProduct(category, group, product)
  if (!found) notFound()

  const { category: c, group: g, product: p } = found

  return (
    <>
      <PageHero
        eyebrow={`${c.title} · ${g.title}`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { href: `/products/${c.slug}`, label: c.shortTitle },
          { href: `/products/${c.slug}#${g.slug}`, label: g.title },
          { label: p.title },
        ]}
      />
      <ProductDetail
        category={c}
        group={g}
        product={p}
        related={relatedProducts(c, g, p.id)}
      />
      <CtaBand />
    </>
  )
}
