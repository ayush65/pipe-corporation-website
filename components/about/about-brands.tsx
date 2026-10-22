import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { brands } from "@/lib/catalog"

export function AboutBrands() {
  return (
    <section aria-labelledby="partners-heading" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Trusted Brand Partnerships"
          title={<span id="partners-heading">Strong relationships. Lasting commitments.</span>}
          description="We don't just distribute products; we build relationships that stand the test of time."
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {brands.map((b, i) => (
            <li key={b.name}>
              <Reveal delay={(i % 5) * 0.05} className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 transition-colors hover:border-primary/40">
                <div className="relative h-16 w-full">
                  <Image src={b.logo} alt="" fill sizes="200px" className="object-contain" />
                </div>
                <p className="text-center text-xs font-semibold text-foreground/80">{b.name}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
