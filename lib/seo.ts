import type { Metadata } from "next"
import { absoluteUrl, site } from "@/lib/site"

type PageMetaInput = {
  title: string
  description: string
  /** Site-relative path, e.g. "/about". */
  path: string
  type?: "website" | "article"
}

/**
 * Builds consistent metadata for a page: canonical URL, Open Graph and Twitter cards.
 * Every page routes through here so tags stay in sync.
 *
 * Social images are intentionally NOT set here. `app/opengraph-image.tsx` generates a
 * branded 1200x630 card through the Next.js file convention; setting `openGraph.images`
 * explicitly would override it. The previous default pointed at `/logo.png`, which is a
 * 400x336 raster — every social card shipped with wrong dimensions and was cropped.
 * Leaving the field unset lets Next attach the generated card (and fall back to it for
 * `twitter:image`).
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
