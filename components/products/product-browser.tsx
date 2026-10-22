"use client"

import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Search, X } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { productPath, type ProductGroup } from "@/lib/catalog"
import { cn } from "@/lib/utils"

export function ProductBrowser({ groups, categorySlug }: { groups: ProductGroup[]; categorySlug: string }) {
  const [activeGroup, setActiveGroup] = useState<string>("all")
  const [query, setQuery] = useState("")
  const [ready, setReady] = useState(false)
  const deferredQuery = useDeferredValue(query)

  // Read ?q= from the URL on mount (kept out of useSearchParams so the page stays static).
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q")
    if (initial) setQuery(initial)
    setReady(true)
  }, [])

  // Keep the URL in sync so a search can be shared or bookmarked.
  useEffect(() => {
    if (!ready) return
    const params = new URLSearchParams(window.location.search)
    if (query.trim()) params.set("q", query)
    else params.delete("q")
    const search = params.toString()
    window.history.replaceState(
      null,
      "",
      search ? `${window.location.pathname}?${search}` : window.location.pathname,
    )
  }, [query, ready])

  const visibleGroups = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return groups
      .filter((g) => activeGroup === "all" || g.slug === activeGroup)
      .map((g) => ({
        ...g,
        products: q
          ? g.products.filter(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                g.title.toLowerCase().includes(q),
            )
          : g.products,
      }))
      .filter((g) => g.products.length > 0)
  }, [groups, activeGroup, deferredQuery])

  const total = visibleGroups.reduce((s, g) => s + g.products.length, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:top-18 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* A `toolbar` role implies a single-tab-stop composite widget with
              arrow-key navigation (APG). These are independent toggle buttons,
              so `group` is the correct role. */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar lg:flex-wrap lg:pb-0" role="group" aria-label="Filter by product range">
            {[{ slug: "all", title: "All ranges" }, ...groups].map((g) => {
              const isActive = activeGroup === g.slug
              return (
                <button
                  key={g.slug}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveGroup(g.slug)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm",
                    isActive
                      ? "border-ink bg-ink text-ink-foreground"
                      : "border-border bg-card text-foreground/75 hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {g.title}
                </button>
              )
            })}
          </div>
          <div className="relative w-full shrink-0 lg:w-72">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" aria-hidden="true" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="font-semibold text-foreground">{total}</span> products
      </p>

      <AnimatePresence mode="popLayout">
        {visibleGroups.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center"
          >
            <p className="font-display text-xl font-bold">No products found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different search, or ask us on WhatsApp — we stock 7,000+ SKUs.</p>
          </motion.div>
        ) : (
          /*
           * Sections animate with `transform` only.
           *
           * `initial={{ opacity: 0 }}` server-rendered every product image at
           * zero opacity, so the catalogue grid was not painted until hydration
           * finished — which pushed LCP out on the two largest pages of the site
           * (146 product pages + 2 category pages). A transform-only entrance
           * paints on the first frame and still reads as an entrance.
           */
          visibleGroups.map((g) => (
            <motion.section
              key={g.slug}
              layout="position"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-labelledby={`group-${g.slug}`}
              className="mt-10 scroll-mt-40 first-of-type:mt-6"
              id={g.slug}
            >
              <div className="flex flex-col gap-1 border-l-4 border-primary pl-4">
                <h2 id={`group-${g.slug}`} className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {g.title}
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {g.description} <span className="text-foreground/65">· {g.products.length} items</span>
                </p>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {/*
                 * Plain <li>: the previous per-item `whileInView` re-ran from
                 * opacity 0 every time a filter change re-mounted the list,
                 * which made the whole grid flash, and it required ~150
                 * IntersectionObserver targets per category page.
                 */}
                {g.products.map((p) => (
                  <li key={p.id} className="h-full">
                    <ProductCard
                      product={p}
                      groupTitle={g.title}
                      href={productPath(categorySlug, g.slug, p.slug)}
                    />
                  </li>
                ))}
              </ul>
            </motion.section>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}
