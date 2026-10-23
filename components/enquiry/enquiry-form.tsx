"use client"

import { useActionState, useId, useRef, useState } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { sendEnquiry } from "@/lib/actions"
import {
  enquiryInitialState,
  enquiryWhatsAppText,
  readEnquiryFields,
  type EnquiryFieldName,
} from "@/lib/enquiry"
import { whatsappLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const fieldClass =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-destructive/20"

const labelClass = "text-sm font-semibold"

export type EnquiryFormProps = {
  /** Product categories offered in the dropdown. */
  categoryTitles: string[]
  /** Where the enquiry came from — "popup", "header", "contact-page". */
  source?: string
  className?: string
  /** Optional "Close" action shown on the success screen (used by the dialog). */
  onDone?: () => void
  /**
   * Show the "Send on WhatsApp" fallback beside the submit button.
   *
   * The popup keeps a single primary action, so it turns this off; the
   * contact page still offers the hand-off.
   */
  showWhatsApp?: boolean
}

export function EnquiryForm(props: EnquiryFormProps) {
  /*
   * `useActionState` has no reset, so the form is remounted with a new key
   * when the visitor wants to send another enquiry. The key lives here rather
   * than in the inner component so the inner one can stay purely derived from
   * the action state.
   */
  const [formKey, setFormKey] = useState(0)
  return <EnquiryFormInner key={formKey} {...props} onReset={() => setFormKey((key) => key + 1)} />
}

function EnquiryFormInner({
  categoryTitles,
  source = "website",
  className,
  onDone,
  showWhatsApp = true,
  onReset,
}: EnquiryFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, enquiryInitialState)
  const formRef = useRef<HTMLFormElement>(null)
  const uid = useId()

  const id = (name: string) => `${uid}-${name}`
  const errorFor = (name: EnquiryFieldName) => (state.status === "invalid" ? state.errors[name] : undefined)

  function onSendToWhatsApp() {
    if (!formRef.current) return
    const data = readEnquiryFields(new FormData(formRef.current))
    window.open(whatsappLink(enquiryWhatsAppText(data)), "_blank", "noopener,noreferrer")
  }

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center",
          className,
        )}
      >
        <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-extrabold">Enquiry sent</h2>
          <p className="mt-1 text-sm text-muted-foreground">{state.message}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            Send another enquiry
          </button>
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep"
            >
              Done
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className={cn("flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8", className)}
    >
      <div>
        <h2 className="font-display text-2xl font-extrabold">Send an enquiry</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We reply with pricing and availability, usually the same working day.
        </p>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Company website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("name")} className={labelClass}>
            Full name
          </label>
          <input
            id={id("name")}
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            aria-invalid={errorFor("name") ? true : undefined}
            aria-describedby={errorFor("name") ? id("name-error") : undefined}
            className={fieldClass}
          />
          {errorFor("name") && (
            <p id={id("name-error")} className="text-xs font-medium text-destructive">
              {errorFor("name")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("phone")} className={labelClass}>
            Phone
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            /*
             * The `pattern` attribute is compiled with the RegExp `v` flag in
             * modern browsers, where `(`, `)`, `{`, `}`, `|`, `/` and `-` are
             * reserved inside a character class and must be escaped. Leaving
             * the parentheses bare makes the whole pattern invalid and the
             * browser logs a SyntaxError on every submit.
             */
            pattern="[0-9+\-\s\(\)]{7,20}"
            aria-invalid={errorFor("phone") ? true : undefined}
            aria-describedby={errorFor("phone") ? id("phone-error") : undefined}
            className={fieldClass}
          />
          {errorFor("phone") && (
            <p id={id("phone-error")} className="text-xs font-medium text-destructive">
              {errorFor("phone")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("email")} className={labelClass}>
            Email <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={120}
            aria-invalid={errorFor("email") ? true : undefined}
            aria-describedby={errorFor("email") ? id("email-error") : undefined}
            className={fieldClass}
          />
          {errorFor("email") && (
            <p id={id("email-error")} className="text-xs font-medium text-destructive">
              {errorFor("email")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={id("city")} className={labelClass}>
            City <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={id("city")}
            name="city"
            autoComplete="address-level2"
            maxLength={60}
            aria-invalid={errorFor("city") ? true : undefined}
            aria-describedby={errorFor("city") ? id("city-error") : undefined}
            className={fieldClass}
          />
          {errorFor("city") && (
            <p id={id("city-error")} className="text-xs font-medium text-destructive">
              {errorFor("city")}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("category")} className={labelClass}>
          Category
        </label>
        <select
          id={id("category")}
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("message")} className={labelClass}>
          Requirement
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder="e.g. 1&quot; SS HDP nipples × 50, CPVC elbows ¾&quot; × 200..."
          aria-invalid={errorFor("message") ? true : undefined}
          aria-describedby={errorFor("message") ? id("message-error") : undefined}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-destructive/20"
        />
        {errorFor("message") && (
          <p id={id("message-error")} className="text-xs font-medium text-destructive">
            {errorFor("message")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-deep disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        {showWhatsApp && (
          <button
            type="button"
            onClick={onSendToWhatsApp}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            <FaWhatsapp className="size-4" aria-hidden="true" />
            Send on WhatsApp
          </button>
        )}
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-center text-xs",
          state.status === "failed" || state.status === "unconfigured"
            ? "text-destructive"
            : "text-muted-foreground",
        )}
      >
        {state.status === "invalid" && state.message}
        {state.status === "failed" && state.message}
        {state.status === "unconfigured" && state.message}
        {state.status === "idle" && "We usually respond within business hours."}
      </p>
    </form>
  )
}
