"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Search, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/catalog"
import { whatsappLink } from "@/lib/site"

export type CatalogueEntry = {
  product: Product
  groupTitle: string
  categoryTitle: string
  categorySlug: string
  groupSlug: string
  href: string
}

export function CatalogueSearch({ entries }: { entries: CatalogueEntry[] }) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    if (!q) return []
    return entries.filter(
      (e) =>
        e.product.title.toLowerCase().includes(q) ||
        e.product.description.toLowerCase().includes(q) ||
        e.groupTitle.toLowerCase().includes(q) ||
        e.categoryTitle.toLowerCase().includes(q),
    )
  }, [entries, deferredQuery])

  const searching = query.trim().length > 0

  return (
    <section aria-labelledby="catalogue-search-heading" className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Search the catalogue</p>
            <h2 id="catalogue-search-heading" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find any fitting in seconds.
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Search across every range we stock — pipes, fittings, valves, taps, solvents and borewell accessories.
            </p>
          </div>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {searching ? (
              <>
                <span className="font-semibold text-foreground">{results.length}</span> match
                {results.length === 1 ? "" : "es"} found
              </>
            ) : (
              <>{entries.length} products indexed</>
            )}
          </p>
        </div>

        <div className="relative mt-8 max-w-2xl">
          <label htmlFor="catalogue-search" className="sr-only">
            Search the full product catalogue
          </label>
          <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “SS HDP nipple”, “CPVC elbow”, “ball valve”…"
            className="h-14 w-full rounded-full border border-input bg-card pl-14 pr-14 text-base outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {searching && results.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center"
            >
              <p className="font-display text-xl font-bold">
                No match for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                We hold 7,000+ SKUs, so plenty is not listed online. Send us the requirement and we will confirm
                price and availability.
              </p>
              <a
                href={whatsappLink(`Hello Pipe Corporation, I am looking for "${query.trim()}" which I could not find on your website.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
              >
                <FaWhatsapp className="size-4" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </motion.div>
          ) : (
            results.length > 0 && (
              <motion.ul
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
              >
                {results.map((e, i) => (
                  <li key={`${e.categorySlug}-${e.groupSlug}-${e.product.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
                      className="h-full"
                    >
                      <ProductCard product={e.product} groupTitle={e.groupTitle} href={e.href} />
                    </motion.div>
                  </li>
                ))}
              </motion.ul>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
