import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * The corporate logo.
 *
 * `mainlogo.webp` is a wide wordmark lockup (900x237), so it is constrained by
 * height only and keeps its own aspect ratio. The artwork is dark ink on a
 * transparent background, so on the dark footer it is placed on a white plate
 * — without it the mark would disappear into the section.
 */
export function BrandLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <span className={cn("flex shrink-0 items-center", inverted && "rounded-lg bg-white px-3 py-2")}>
        <Image
          src="/mainlogo.webp"
          alt="Pipe Corporation"
          width={900}
          height={237}
          /* Only the header instance affects LCP; the footer one can wait. */
          priority={!inverted}
          className="h-9 w-auto sm:h-10"
        />
      </span>
    </Link>
  )
}
