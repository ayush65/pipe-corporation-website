export const site = {
  name: "Pipe Corporation",
  tagline: "Rooted in Trust. Driven by Quality. Growing Through Innovation.",
  /**
   * Canonical origin used for metadata, sitemap.xml and robots.txt.
   * Override with NEXT_PUBLIC_SITE_URL (see .env.example).
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pipecorporation.in").replace(/\/+$/, ""),
  email: "pipecorporation79@gmail.com",
  phoneMain: "+91 85550 68339",
  phoneMainHref: "tel:+918555068339",
  phoneOffice: "040-66568571",
  phoneOfficeHref: "tel:+914066568571",
  whatsapp: "+91 85550 68339",
  whatsappNumber: "918555068339",
  city: "Hyderabad, Telangana",
  since: 1999,
  founders: ["Ganesh Agarwal", "Jagdish Agarwal", "Vishnu Agarwal"],
  address: {
    street: "",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "",
    country: "IN",
  },
  /** Machine readable opening hours (schema.org). */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
    { days: ["Saturday"], opens: "09:00", closes: "17:00" },
  ],
  hoursDisplay: [
    { label: "Monday – Friday", value: "9:00 AM – 7:00 PM" },
    { label: "Saturday", value: "9:00 AM – 5:00 PM" },
    { label: "Sunday", value: "Closed" },
  ],
  paymentAccepted: ["Cash", "UPI", "Bank Transfer", "Cheque"],
  priceRange: "₹₹",
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
]

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function productEnquiryLink(productTitle: string, categoryTitle?: string) {
  const context = categoryTitle ? ` (${categoryTitle})` : ""
  return whatsappLink(
    `Hello Pipe Corporation, I would like to enquire about "${productTitle}"${context}. Please share price and availability.`,
  )
}

/** Absolute URL for a site-relative path (used by metadata, sitemap and JSON-LD). */
export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).toString()
}
