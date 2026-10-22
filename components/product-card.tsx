import Image from "next/image"
import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"
import type { Product } from "@/lib/catalog"
import { productEnquiryLink } from "@/lib/site"

export function ProductCard({
  product,
  groupTitle,
  href,
}: {
  product: Product
  groupTitle?: string
  /** When set, the image and title link to the product page instead of nowhere. */
  href?: string
}) {
  const image = (
    <Image
      src={product.image}
      alt={product.title}
      fill
      /*
       * One card per row below `sm`, so the image spans the full column there
       * instead of the old half-width slot. Getting this wrong makes the
       * browser fetch an image that is too small and paint it blurry.
       */
      sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 90vw"
      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
    />
  )

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/5 motion-reduce:hover:translate-y-0">
      {/* 4:3 on phones keeps a single full-width card from turning into a
          500px-tall block; square again once the grid goes multi-column. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white sm:aspect-square">
        {href ? (
          <Link href={href} className="absolute inset-0 block">
            {image}
            <span className="sr-only">View {product.title}</span>
          </Link>
        ) : (
          image
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-3.5 sm:p-4">
        <h3 className="font-display text-sm font-bold leading-snug text-foreground sm:text-base">
          {href ? (
            <Link href={href} className="transition-colors hover:text-primary">
              {product.title}
            </Link>
          ) : (
            product.title
          )}
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">{product.description}</p>
        <a
          href={productEnquiryLink(product.title, groupTitle)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-ink-foreground transition-colors hover:bg-primary sm:text-sm"
        >
          <FaWhatsapp className="size-4" aria-hidden="true" />
          Enquire
          <span className="sr-only"> about {product.title}</span>
        </a>
      </div>
    </article>
  )
}
