import Image from "next/image"
import { Boxes, Lightbulb, ShieldCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

export const principles = [
  {
    no: "01",
    icon: ShieldCheck,
    title: "Quality Without Compromise",
    body: "Every product we offer must deliver reliability, durability and the confidence our customers deserve.",
  },
  {
    no: "02",
    icon: Lightbulb,
    title: "Innovation with Purpose",
    body: "Even the smallest improvement matters. We seek better design, function and application every day.",
  },
  {
    no: "03",
    icon: Boxes,
    title: "Everything Under One Roof",
    body: "7,000+ SKUs so you can fulfil plumbing, sanitary and agricultural needs from one trusted source.",
  },
]

const details = [
  { src: "/products/agriculture/oxyjal-ci-flanges/precicse-threading.webp", label: "Precise threading" },
  { src: "/products/agriculture/oxyjal-ci-flanges/priceses-holes.webp", label: "Accurate holes" },
  { src: "/products/agriculture/oxyjal-ci-flanges/brand-marking-photo.webp", label: "Brand marking" },
]

export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 size-[30rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-10">
          <SectionHeading
            inverted
            eyebrow="Why Pipe Corporation"
            title={<span id="principles-heading">Three principles that define everything we do.</span>}
          />
          <ol className="flex flex-col gap-4">
            {principles.map((p, i) => (
              <li key={p.no}>
                <Reveal delay={i * 0.08} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                    <p.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-white/55">{p.no}</p>
                    <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-3 self-center sm:gap-4">
          {details.map((d, i) => (
            <Reveal
              key={d.src}
              delay={i * 0.1}
              className={i === 0 ? "col-span-2" : undefined}
            >
              <figure className="group overflow-hidden rounded-2xl bg-white">
                <div className={i === 0 ? "relative aspect-[16/9]" : "relative aspect-square"}>
                  <Image
                    src={d.src}
                    alt={`OXYJAL C.I flange — ${d.label.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-xs font-semibold text-foreground">
                  {d.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
