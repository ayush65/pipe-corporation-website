import Image from "next/image"
import { brands } from "@/lib/catalog"

export function BrandMarquee() {
  const featuredBrands = brands.filter((b) =>
    ["Hero Agro Plast", "OXYJAL", "IZOTI Taps"].includes(b.name)
  )
  const otherBrands = brands.filter((b) =>
    !["Hero Agro Plast", "OXYJAL", "IZOTI Taps"].includes(b.name)
  )
  const loop = [...featuredBrands, ...featuredBrands, ...otherBrands, ...otherBrands]

  return (
    <section aria-labelledby="brands-heading" className="border-b border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="brands-heading" className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Authorised distributors of India&apos;s trusted brands
        </h2>
      </div>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-4 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center hover:[animation-play-state:paused]">
          {loop.map((b, i) => {
            const isFeatured = ["Hero Agro Plast", "OXYJAL", "IZOTI Taps"].includes(b.name)
            const baseIndex = i % brands.length
            const isOriginal = baseIndex < brands.length
            return (
              <li
                key={`${b.name}-${i}`}
                aria-hidden={!isOriginal ? "true" : undefined}
                className={`flex shrink-0 items-center justify-center rounded-xl border border-border bg-white px-5 grayscale transition hover:grayscale-0 ${
                  isFeatured
                    ? "h-24 w-52 sm:h-28 sm:w-60"
                    : "h-20 w-40 sm:h-24 sm:w-48"
                }`}
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={isFeatured ? 200 : 160}
                  height={isFeatured ? 100 : 80}
                  className={`h-auto w-auto object-contain ${
                    isFeatured ? "max-h-16 sm:max-h-20" : "max-h-14"
                  }`}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
