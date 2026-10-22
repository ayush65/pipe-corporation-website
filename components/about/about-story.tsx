import Image from "next/image"
import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const portfolio = [
  "G.I. Pipes & Fittings",
  "C.I. Fittings",
  "Stainless Steel HDP Nipples",
  "PVC Agriculture Fittings",
  "CPVC Pipes & Fittings",
  "UPVC Pipes & Fittings",
  "SWR Pipes & Fittings",
  "Sanitary Accessories & Plumbing Solutions",
]

export function AboutStory() {
  return (
    <section aria-labelledby="story-heading" className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-white">
            <Image
              src="/products/agriculture/oxyjal-ss-hdp-fittings/agricluture-mix-products-photo.webp"
              alt="Range of agriculture and engineering fittings distributed by Pipe Corporation"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain p-6"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl bg-ink p-5 text-ink-foreground shadow-2xl sm:left-auto sm:right-6 sm:w-72">
            <span className="font-display text-4xl font-extrabold text-primary-bright">25+</span>
            <span className="text-sm leading-snug text-white/75">years serving Hyderabad&apos;s trade since 1999</span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Our Story"
            title={<span id="story-heading">Every journey begins with a vision.</span>}
          />
          <Reveal delay={0.1} className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              The story of Pipe Corporation began in 1999 in Hyderabad, when three brothers from{" "}
              <strong className="font-semibold text-foreground">Bhiwani, Haryana</strong> set out with a shared ambition
              to build a business founded on trust, quality and long-lasting relationships.
            </p>
            <p>
              Starting as wholesale dealers of G.I. pipes, the brothers laid the foundation of a company that would
              steadily grow, evolve and diversify. Today it is a comprehensive distribution enterprise serving both the{" "}
              <strong className="font-semibold text-foreground">Plumbing & Sanitary</strong> and{" "}
              <strong className="font-semibold text-foreground">Agriculture & Engineering</strong> sectors.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {portfolio.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm font-medium">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
