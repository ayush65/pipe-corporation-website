"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const testimonials = [
  {
    quote:
      "We have sourced CPVC and SWR fittings from Pipe Corporation for over a decade. Stock is always available and the quality is consistent on every site.",
    name: "Ramesh Reddy",
    role: "Plumbing Contractor, Kukatpally",
  },
  {
    quote:
      "Their OXYJAL SS HDP nipples have completely solved our borewell corrosion problems. The team guides us to the right size every single time.",
    name: "Srinivas Rao",
    role: "Borewell & Pump Dealer, Warangal",
  },
  {
    quote:
      "One call and the entire order — taps, solvents, valves and accessories — is ready. Having everything under one roof saves us days.",
    name: "Mohammed Imran",
    role: "Hardware Retailer, Secunderabad",
  },
  {
    quote:
      "Fair pricing, genuine brands and a relationship built on trust. Pipe Corporation is our first call for agriculture fittings.",
    name: "K. Venkatesh",
    role: "Agri Inputs Distributor, Nalgonda",
  },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length)

  return (
    <section aria-labelledby="testimonials-heading" className="bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Testimonials"
            title={<span id="testimonials-heading">Trusted by dealers, contractors & farmers.</span>}
            description="Relationships that stand the test of time — in the words of the people we serve."
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-ink hover:text-ink-foreground"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Previous testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-crimson-deep"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Next testimonial</span>
            </button>
            <p className="ml-2 text-sm font-medium tabular-nums text-muted-foreground" aria-live="polite">
              {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-3 rotate-2 rounded-3xl bg-primary/90 sm:-inset-4" />
          <div className="relative min-h-80 overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground sm:p-12">
            <Quote className="size-10 text-primary" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) go(1)
                  else if (info.offset.x > 50) go(-1)
                }}
                className="mt-6 touch-pan-y"
              >
                <div className="flex gap-1" aria-label="5 out of 5 stars" role="img">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 text-pretty font-display text-xl font-semibold leading-snug sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="chrome-ring flex size-12 items-center justify-center rounded-full p-0.5">
                    <span className="crimson-orb flex size-full items-center justify-center rounded-full font-display text-sm font-bold">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .replace(".", "")
                        .slice(0, 2)}
                    </span>
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-white/60">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
