import type { Metadata } from "next"
import { CtaBand } from "@/components/cta-band"
import { BrandMarquee } from "@/components/home/brand-marquee"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { Faq } from "@/components/home/faq"
import { FeaturedProducts } from "@/components/home/featured-products"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { Principles } from "@/components/home/principles"
import { StatsBand } from "@/components/home/stats-band"
import { Testimonials } from "@/components/home/testimonials"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Pipe Corporation | Plumbing, Sanitary & Agriculture Fittings in Hyderabad",
  description:
    "Pipe Corporation, Hyderabad — trusted distributor since 1999 of G.I, C.I, SS HDP, CPVC, UPVC, SWR pipes & fittings, taps and agriculture fittings. 7,000+ SKUs under one roof.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BrandMarquee />
      <StatsBand />
      <CategoryShowcase />
      <FeaturedProducts />
      <Principles />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  )
}
