import { site } from "@/lib/site"
import { absoluteUrl } from "@/lib/site"

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    description:
      "Distributors of plumbing, sanitary and agricultural pipe fittings and accessories in Hyderabad since 1999.",
    foundingDate: String(site.since),
    email: site.email,
    telephone: site.phoneMain,
    founders: site.founders.map((name) => ({ "@type": "Person", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneMain,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "te"],
      },
    ],
    sameAs: [`https://wa.me/${site.whatsappNumber}`],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/logo.png"),
    logo: absoluteUrl("/logo.png"),
    description:
      "Wholesale distributor of G.I, C.I, SS HDP, CPVC, UPVC, SWR pipes and fittings, taps, valves and agriculture accessories.",
    telephone: site.phoneMain,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: "INR",
    paymentAccepted: site.paymentAccepted.join(", "),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [`https://wa.me/${site.whatsappNumber}`],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; item?: string }>
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item ? absoluteUrl(item.item) : undefined,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  category,
}: {
  name: string
  description: string
  image?: string
  url: string
  category?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ? absoluteUrl(image) : absoluteUrl("/logo.png"),
    url: absoluteUrl(url),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: absoluteUrl(url),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function WebPageJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(url),
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
