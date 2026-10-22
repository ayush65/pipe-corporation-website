import { Eye, Target } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site } from "@/lib/site"

const founders = site.founders

export function AboutVision() {
  return (
    <section aria-label="Vision and mission" className="bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col gap-4 rounded-3xl bg-ink p-8 text-ink-foreground sm:p-10">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary">
              <Eye className="size-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Our Vision</h2>
            <p className="leading-relaxed text-white/70">
              To become a trusted and comprehensive destination for plumbing, sanitary and agricultural solutions by
              continuously expanding our product range, embracing meaningful innovation, and maintaining uncompromising
              standards of quality.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-4 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
            <span className="flex size-12 items-center justify-center rounded-xl bg-ink">
              <Target className="size-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Our Mission</h2>
            <p className="leading-relaxed text-white/85">
              To provide customers with reliable, innovative and high-quality products while offering an extensive
              selection, dependable service, and long-term value.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="max-w-3xl text-balance font-display text-2xl font-bold leading-snug sm:text-3xl">
            &ldquo;Rooted in Trust. Driven by Quality. Growing Through Innovation.&rdquo;
          </p>
          <ul className="flex flex-wrap justify-center gap-3" aria-label="Founders">
            {founders.map((f) => (
              <li key={f} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold">
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">Founders, Pipe Corporation</p>
        </Reveal>
      </div>
    </section>
  )
}
