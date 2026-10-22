import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow: string
  /** Omit to render a compact hero (breadcrumb + eyebrow only). */
  title?: string
  description?: string
  crumbs: { href?: string; label: string }[]
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[28rem] rounded-full bg-primary/30 blur-3xl" />
      <div
        className={
          title
            ? "mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
            : "mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        }
      >
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/80">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal className={title ? "mt-6 max-w-3xl" : "mt-4"}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-bright">{eyebrow}</p>
          {title && (
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          )}
          {description && <p className="mt-5 max-w-2xl text-pretty text-base text-white/65 sm:text-lg">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
