import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { categories, countProducts } from "@/lib/catalog"

export function CategoryShowcase() {
  return (
    <section aria-labelledby="categories-heading" className="bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Categories"
            title={<span id="categories-heading">Two sectors. One trusted source.</span>}
            description="Browse our complete range across plumbing & sanitary and agriculture & engineering."
          />
          <Link href="/products" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            View all products
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <Link
                href={`/products/${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink text-ink-foreground"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white sm:aspect-[16/11]">
                  <Image
                    src={c.cover}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 items-end justify-between gap-4 p-6 sm:p-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-bright">
                      {countProducts(c)} products · {c.groups.length} ranges
                    </p>
                    <h3 className="font-display text-2xl font-extrabold sm:text-3xl">{c.title}</h3>
                    <p className="text-sm text-white/65">{c.tagline}</p>
                  </div>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
