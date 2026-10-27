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
    image: "/products/sanitary/plumbing-range.webp",
    alt: "Plumbing range — CPVC, UPVC and SWR pipes, taps and fittings",
    href: "/products/sanitary-plumbing",
    cta: "Explore Plumbing",
    tag: "Hero · Amrut · IZOTI · FLOZY",
  },
  {
    eyebrow: "Solvents & Lubricants",
    title: "Stronger joints. Safer seals.",
    description:
      "PVC, UPVC, CPVC solvents and lubricants for leak-proof, long-lasting pipe joints on every job.",
    image: "/products/sanitary/solvents/solvents-group-photo.webp",
    alt: "Solvents and lubricants group photo",
    href: "/products/sanitary-plumbing",
    cta: "Explore Solvents",
    tag: "PVC · UPVC · CPVC",
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

  /*
   * Auto-rotation is disabled for visitors who ask for reduced motion. The
   * rotation is driven by the progress bar's CSS animation (see
   * `onAnimationEnd` below), so simply not starting that animation is enough
   * — the visitor then drives the carousel with the arrows / dots.
   */
  const autoRotate = !reduceMotion

  const go = (next: number) => {
    const dir = next > index || (index === slides.length - 1 && next === 0) ? 1 : -1
    setState([(next + slides.length) % slides.length, dir])
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(index + 1)
    else if (info.offset.x > 60) go(index - 1)
  }

  /*
   * Warm the browser cache for the next slide so the crossfade never shows a
   * blank frame.
   *
   * This used to be a `<link rel="preload">` (via React 19's `preload()`).
   * Chrome flags any preload that is not matched by a real element within a
   * few seconds of the load event, and the next slide is 6s away — so the
   * console was full of "preloaded but not used" warnings. Mounting the image
   * instead turns it into an ordinary image request that the browser fetches
   * and decodes ahead of time, which is what the preload was after anyway.
   */
  const words = slide.title.split(" ")
  const nextSlide = slides[(index + 1) % slides.length]

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
        {/*
         * Slide container.
         *
         * APG carousel pattern: the slide is a `group` with
         * `aria-roledescription="slide"` and an "n of N" label, and the slide
         * picker is a plain button group — NOT a `tablist`. Using `role="tab"`
         * implied the slides were tab panels (they are not) and left the
         * picker outside the tab sequence for keyboard users.
         *
         * `aria-live` follows the APG guidance: silent while the carousel
         * rotates on its own, polite once the visitor takes control with the
         * pause button.
         */}
        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}`}
          aria-live={paused ? "polite" : "off"}
          className="order-2 flex flex-col lg:order-1"
        >
          {/* Eyebrow — persistent element, only the label is swapped. */}
          <p className="inline-flex h-7 items-center gap-2 self-start overflow-hidden rounded-full border border-white/15 bg-white/5 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={slide.eyebrow}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="inline-block"
              >
                {slide.eyebrow}
              </motion.span>
            </AnimatePresence>
          </p>

          {/*
           * The <h1> is deliberately NOT inside an <AnimatePresence>.
           *
           * Previously the whole slide — including the <h1> — was swapped on
           * every change, so the page had no <h1> at all for the duration of
           * the transition. That breaks the document outline, hides the page
           * heading from assistive technology and crawlers, and makes LCP
           * re-trigger. The heading now stays mounted for the lifetime of the
           * page and only its words animate.
           */}
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="inline-block"
              >
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
              </motion.span>
            </AnimatePresence>
          </h1>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
            >
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                {slide.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
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
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-4">
            <div role="group" aria-label="Choose slide to display" className="flex flex-1 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Slide ${i + 1} of ${slides.length}: ${s.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
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
                          animation: autoRotate ? `hero-progress ${SLIDE_MS}ms linear forwards` : undefined,
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
                aria-pressed={paused}
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
            <div aria-hidden="true" className="crimson-orb absolute inset-[6%] rounded-[2rem] blur-2xl opacity-60" />
            <div className="absolute inset-0 rounded-[2.25rem] p-[3.5%] shadow-2xl shadow-black/60">
              <div className="relative size-full overflow-hidden rounded-[1.75rem] bg-white">
                {/* The next slide's image is mounted (and hidden) so the
                    browser fetches and decodes it before the crossfade —
                    see the note above. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
                  <Image
                    src={nextSlide.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 448px, 352px"
                    className="pointer-events-none object-contain p-[9%]"
                    draggable={false}
                  />
                </div>
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
