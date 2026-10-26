import type { MetadataRoute } from "next"
import { absoluteUrl, site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/static/chunks/*.js.map", "/_next/static/css/*.css.map"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    /*
     * The `host` directive takes a bare hostname (`www.example.com`), not a
     * URL. Passing a full origin made the directive non-conformant, and
     * crawlers are allowed to ignore the whole file when it is malformed.
     */
    host: new URL(site.url).host,
  }
}
