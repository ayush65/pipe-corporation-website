"use client"

import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 1999, label: "Established in Hyderabad", format: (n: number) => String(n) },
  { value: 7000, suffix: "+", label: "SKUs under one roof", format: (n: number) => n.toLocaleString("en-IN") },
  { value: 9, suffix: "+", label: "Trusted brand partners", format: (n: number) => String(n) },
  { value: 25, suffix: "+", label: "Years of trust & quality", format: (n: number) => String(n) },
]

function Counter({ to, format, suffix }: { to: number; format: (n: number) => string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const start = to > 1000 && to < 3000 ? to - 40 : 0
  const [n, setN] = useState(start)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(to)
      return
    }
    const controls = animate(start, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, start, to])

  return (
    <span ref={ref} className="tabular-nums">
      {format(n)}
      {suffix && <span className="text-primary">{suffix}</span>}
    </span>
  )
}

export function StatsBand() {
  return (
    <section aria-label="Pipe Corporation in numbers" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 bg-card p-6 sm:p-8">
              <dt className="order-2 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                <Counter to={s.value} format={s.format} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
