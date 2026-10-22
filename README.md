# Pipe Corporation — Website

Marketing + catalogue website for **Pipe Corporation**, a Hyderabad-based distributor of plumbing,
sanitary and agricultural pipe fittings established in 1999.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and **Motion**.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
```

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable                | Purpose                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | Canonical origin used for metadata, `sitemap.xml`, `robots.txt` and JSON-LD.          |

Everything else — phone numbers, email, address, opening hours, founders — lives in
`lib/site.ts` so it can be edited without touching components.

## Project structure

```
app/
  layout.tsx                     root layout, global metadata + Organization/LocalBusiness JSON-LD
  page.tsx                       home
  about/                         story, timeline, brands, vision
  contact/                       channels, enquiry form, business hours
  products/
    page.tsx                     category overview + catalogue-wide search
    [category]/                  one page per category, with range filter + search
    [category]/[group]/[product]/ one page per product (146 pages)
  not-found.tsx  error.tsx  global-error.tsx  loading.tsx
  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
components/
  home/        hero, marquee, stats, categories, featured, principles, testimonials, FAQ
  products/    product browser, catalogue search, product detail
  about/       story, timeline, brands, vision
  ui/          shadcn primitives (button, input, label, textarea, accordion)
lib/
  site.ts      business details, contact info, navigation
  catalog.ts   the product catalogue — categories, ranges, products, helpers
  seo.ts       shared metadata builder (canonical, Open Graph, Twitter)
```

## The catalogue

`lib/catalog.ts` is the single source of truth. Each category holds ranges (`ProductGroup`), and each
range holds products (`Product`). Product images live under `public/products/<category>/<range>/`.

Adding a product is a one-liner:

```ts
["G.I Nipple", "gi-nipple", "Heavy galvanised nipple with precise threading."],
```

The slug is derived from the file name, so drop the matching `.webp` into the range folder and the
product page, sitemap entry, search index and JSON-LD are all generated automatically.

## Enquiries

Every product surfaces a WhatsApp deep link pre-filled with the product name and range
(`productEnquiryLink` in `lib/site.ts`), and the contact form composes a WhatsApp message from the
submitted fields. No server or third-party form backend is required.

## Before going live

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
2. Fill in the street address in `lib/site.ts` (`site.address.street` / `postalCode`) — it is used by
   the LocalBusiness JSON-LD.
3. Confirm the opening hours in `lib/site.ts` (`site.hours` / `site.hoursDisplay`).
4. Replace the placeholder testimonials in `components/home/testimonials.tsx` with real quotes.
5. Update the WhatsApp/phone numbers if they have changed.
