"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function CategoryTabs({
  active,
  items,
}: {
  active: string
  items: { slug: string; label: string; count: number }[]
}) {
  return (
    <nav aria-label="Product categories" className="mt-10">
      <ul className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/15 bg-white/5 p-1 no-scrollbar">
        {items.map((item) => {
          const isActive = active === item.slug
          return (
            <li key={item.slug} className="shrink-0">
              <Link
                href={item.slug === "all" ? "/products" : `/products/${item.slug}`}
                aria-current={isActive ? "page" : undefined}
                scroll={false}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5",
                  isActive ? "text-primary-foreground" : "text-white/70 hover:text-white",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{item.label}</span>
                <span
                  className={cn(
                    "relative rounded-full px-2 py-0.5 text-[11px] tabular-nums",
                    isActive ? "bg-black/20" : "bg-white/10",
                  )}
                >
                  {item.count}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
