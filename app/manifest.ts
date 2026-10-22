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
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Products", url: "/products" },
      { name: "Contact", url: "/contact" },
    ],
  }
}
