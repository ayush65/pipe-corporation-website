"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { whatsappLink } from "@/lib/site"

const fieldClass =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"

export function ContactForm({ categoryTitles }: { categoryTitles: string[] }) {
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()
    const message = [
      "Hello Pipe Corporation,",
      "",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      get("city") ? `City: ${get("city")}` : "",
      `Category: ${get("category")}`,
      "",
      get("message"),
    ]
      .filter((l, idx) => l !== "" || idx === 1 || idx === 6)
      .join("\n")
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer")
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Send an enquiry</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your message opens in WhatsApp so we can reply instantly.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold">
            Full name
          </label>
          <input id="name" name="name" required autoComplete="name" maxLength={80} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+\-\s]{8,16}"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className="text-sm font-semibold">
            City <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="city" name="city" autoComplete="address-level2" maxLength={60} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-semibold">
            Category
          </label>
          <select
            id="category"
            name="category"
            className={fieldClass}
            defaultValue={categoryTitles[0] ?? "Both / Other"}
          >
            {categoryTitles.map((title) => (
              <option key={title}>{title}</option>
            ))}
            <option>Both / Other</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold">
          Requirement
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={1000}
          placeholder="e.g. 1&quot; SS HDP nipples × 50, CPVC elbows ¾&quot; × 200..."
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
      >
        <Send className="size-4" aria-hidden="true" />
        Send via WhatsApp
      </button>
      <p className="text-center text-xs text-muted-foreground" role="status">
        {sent ? "WhatsApp opened in a new tab — just tap send." : "We usually respond within business hours."}
      </p>
    </form>
  )
}
