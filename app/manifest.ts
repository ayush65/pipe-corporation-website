import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Plumbing, Sanitary & Agriculture Fittings`,
    short_name: site.name,
    description:
      "Distributors of plumbing, sanitary and agricultural pipe fittings and accessories in Hyderabad since 1999.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#111111",
    categories: ["shopping", "business", "productivity"],
    /*
     * The declared `sizes` must match the real pixel dimensions of the file —
     * Chrome rejects an install prompt whose 512x512 icon is actually 64x64.
     * `public/icon.png` is a 64x64 favicon, so the installable sizes live in
     * their own files.
     */
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "Products", url: "/products" },
      { name: "Contact", url: "/contact" },
    ],
  }
}
