import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: "left" | "center"
  inverted?: boolean
  className?: string
}) {
  return (
    <Reveal className={cn("flex max-w-2xl flex-col gap-4", align === "center" && "mx-auto items-center text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
          inverted ? "text-primary-bright" : "text-primary",
        )}
      >
        <span className={cn("h-px w-6", inverted ? "bg-primary-bright" : "bg-primary")} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
          inverted ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-pretty text-base leading-relaxed sm:text-lg", inverted ? "text-white/65" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
