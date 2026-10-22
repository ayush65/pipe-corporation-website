"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw, MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/site"

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Something went wrong</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          We hit an unexpected snag.
        </h1>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          The page could not be loaded. Please try again — and if it keeps happening, call us and we will help you
          directly.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/70">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/40"
          >
            Back to home
          </Link>
          <a
            href={whatsappLink("Hello Pipe Corporation, I am facing an error on your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/40"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Report it
          </a>
        </div>
      </div>
    </section>
  )
}
