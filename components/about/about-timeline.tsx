import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const milestones = [
  { year: "1999", title: "The beginning", body: "Three brothers start a wholesale G.I. pipe business in Hyderabad." },
  { year: "Growth", title: "Expanding the range", body: "C.I. fittings, SS HDP nipples and PVC agriculture fittings join the portfolio." },
  { year: "Partnerships", title: "Trusted brands", body: "Long-standing distributorships with Hero, OXYJAL, IZOTI, FLOZY, BOND-WELD and more." },
  { year: "Today", title: "7,000+ SKUs", body: "A one-stop destination for plumbing, sanitary and agricultural solutions." },
]

export function AboutTimeline() {
  return (
    <section aria-labelledby="journey-heading" className="bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Our Journey"
          title={<span id="journey-heading">Built on a strong foundation.</span>}
        />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
          <span aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-primary via-foreground/20 to-primary md:block" />
          {milestones.map((m, i) => (
            <li key={m.year}>
              <Reveal delay={i * 0.1} className="relative flex flex-col gap-3">
                <span className="chrome-ring relative z-10 flex size-12 items-center justify-center rounded-full p-0.5">
                  <span className="crimson-orb flex size-full items-center justify-center rounded-full text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{m.year}</p>
                <h3 className="font-display text-xl font-bold">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
