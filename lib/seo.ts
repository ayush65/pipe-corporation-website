import type { Metadata } from "next"
import { absoluteUrl, site } from "@/lib/site"

type PageMetaInput = {
  title: string
  description: string
  /** Site-relative path, e.g. "/about". */
  path: string
  /** Site-relative image path used for social cards. */
  image?: string
  type?: "website" | "article"
}

/**
 * Builds consistent metadata for a page: canonical URL, Open Graph and Twitter cards.
 * Every page routes through here so tags stay in sync.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/logo.png",
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}
