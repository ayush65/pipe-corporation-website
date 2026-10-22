"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react"
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const SLIDE_MS = 6000

const slides = [
  {
    eyebrow: "Sanitary & Plumbing",
    title: "Everything that flows, under one roof.",
    description:
      "CPVC, UPVC, SWR & UGD pipe systems, taps, showers and accessories from India's most trusted brands.",
    image: "/products/sanitary/hero-agro-plast/hero-group-photo.webp",
    alt: "Hero Agro Plast range of CPVC, UPVC, SWR pipes and fittings",
    href: "/products/sanitary-plumbing",
    cta: "Explore Plumbing",
    tag: "Hero · Amrut · IZOTI · FLOZY",
  },
  {
    eyebrow: "Agriculture & Engineering",
    title: "Built for borewells. Made to last.",
    description:
      "OXYJAL stainless steel HDP nipples, bends and jalis engineered for corrosion-free performance in the field.",
    image: "/products/agriculture/oxyjal-ss-hdp-fittings/ss-hdp-nipples-group-photo.webp",
    alt: "OXYJAL stainless steel HDP nipples and fittings",
    href: "/products/agriculture-engineering",
    cta: "Explore Agriculture",
    tag: "SS HDP Fittings",
  },
  {
    eyebrow: "OXYJAL C.I Flanges",
    title: "Precision you can see in every thread.",
    description:
      "Accurately drilled holes, clean threading and clear brand marking — cast iron flanges that fit right the first time.",
    image: "/products/agriculture/oxyjal-ci-flanges/c-i-flanges-group-pic.webp",
    alt: "OXYJAL cast iron flanges group",
    href: "/products/agriculture-engineering",
    cta: "View Flanges",
    tag: "Precision Cast",
  },
  {
    eyebrow: "Since 1999 · Hyderabad",
    title: "A legacy of trust. 7,000+ SKUs.",
    description:
      "Three generations of expertise serving dealers, contractors and farmers with the right product, every time.",
    image: "/products/agriculture/oxyjal-ss-hdp-fittings/agricluture-mix-products-photo.webp",
    alt: "Mix of agriculture fittings, valves and clamps",
    href: "/about",
    cta: "Our Story",
    tag: "25+ Years",
  },
]

export function HeroCarousel() {
  const reduceMotion = useReducedMotion()
  const [[index, direction], setState] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isPaused = paused || hovered
  const slide = slides[index]

  const go = (next: number) => {
    const dir = next > index || (index === slides.length - 1 && next === 0) ? 1 : -1
    setState([(next + slides.length) % slides.length, dir])
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(index + 1)
    else if (info.offset.x > 60) go(index - 1)
  }

  const words = slide.title.split(" ")

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured product ranges"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 size-[42rem] -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-10 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8 lg:py-16">
        <div className="order-2 flex flex-col lg:order-1" aria-live={isPaused ? "polite" : "off"}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                {slide.eyebrow}
              </motion.p>

              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {words.map((word, i) => (
                  <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
                    <motion.span
                      className={cn("inline-block", i === words.length - 1 && "text-primary-bright")}
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                      {i < words.length - 1 && "\u00A0"}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/70 sm:text-lg"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={slide.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
                >
                  {slide.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex flex-1 gap-2" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide 0${i + 1}: ${s.eyebrow}`}
                  onClick={() => go(i)}
                  className="group flex flex-1 flex-col gap-2 py-2 text-left"
                >
                  <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-white/15">
                    {i < index && <span className="absolute inset-0 bg-white/60" />}
                    {i === index && (
                      <span
                        key={`${index}-progress`}
                        onAnimationEnd={() => go(index + 1)}
                        className="absolute inset-0 origin-left bg-primary"
                        style={{
                          animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      "hidden text-[11px] font-semibold uppercase tracking-wider transition-colors sm:block",
                      i === index ? "text-white" : "text-white/55 group-hover:text-white/75",
                    )}
                  >
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                <span className="sr-only">Previous slide</span>
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink"
              >
                {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                <span className="sr-only">{paused ? "Play carousel" : "Pause carousel"}</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-ink"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
                <span className="sr-only">Next slide</span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="relative order-1 mx-auto w-full max-w-[22rem] cursor-grab touch-pan-y active:cursor-grabbing sm:max-w-md lg:order-2 lg:max-w-xl"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          <div className="relative aspect-square">
            <div
              aria-hidden="true"
              className="motion-safe-spin absolute -inset-3 rounded-full border border-dashed border-white/20 sm:-inset-6"
              style={{ animation: "slow-spin 40s linear infinite" }}
            />
            <div aria-hidden="true" className="crimson-orb absolute inset-[6%] rounded-full blur-2xl opacity-60" />
            <div className="chrome-ring absolute inset-0 rounded-full p-[3.5%] shadow-2xl shadow-black/60">
              <div className="relative size-full overflow-hidden rounded-full bg-white">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={slide.image}
                    custom={direction}
                    className="absolute inset-0"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 1.15, rotate: direction * 12, x: `${direction * 30}%` }
                    }
                    animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.85, rotate: direction * -12, x: `${direction * -30}%` }
                    }
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 560px, (min-width: 640px) 448px, 352px"
                      className="pointer-events-none object-contain p-[9%]"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.tag}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg sm:bottom-4 sm:left-0 sm:translate-x-0"
              >
                {slide.tag}
              </motion.div>
            </AnimatePresence>

            <div className="absolute -right-1 top-6 hidden rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 backdrop-blur sm:block">
              <p className="font-display text-2xl font-extrabold">
                7,000<span className="text-primary">+</span>
              </p>
              <p className="text-[11px] uppercase tracking-wider text-white/60">Products in stock</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
