import type { Metadata } from "next"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutTimeline } from "@/components/about/about-timeline"
import { AboutBrands } from "@/components/about/about-brands"
import { AboutVision } from "@/components/about/about-vision"
import { Principles } from "@/components/home/principles"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Pipe Corporation — a legacy of trust, quality and innovation since 1999. Founded in Hyderabad by three brothers from Bhiwani, Haryana.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Since 1999"
        title="A legacy of trust, quality & innovation."
        description="From three brothers with a vision in Hyderabad to a distribution enterprise serving plumbing, sanitary and agricultural needs with 7,000+ SKUs."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />
      <AboutStory />
      <AboutTimeline />
      <Principles />
      <AboutBrands />
      <AboutVision />
      <CtaBand />
    </>
  )
}
