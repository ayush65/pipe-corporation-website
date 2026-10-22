import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function BrandLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl p-1",
          inverted ? "bg-white" : "bg-transparent",
        )}
      >
        <Image src="/logo-mark.png" alt="" width={84} height={65} className="h-auto w-full" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-extrabold tracking-wide sm:text-lg",
            inverted ? "text-ink-foreground" : "text-foreground",
          )}
        >
          PIPE CORPORATION
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium uppercase tracking-[0.2em]",
            inverted ? "text-primary-bright" : "text-primary",
          )}
        >
          Since 1999
        </span>
      </span>
    </Link>
  )
}
