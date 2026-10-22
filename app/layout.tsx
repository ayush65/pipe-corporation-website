import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { MotionProvider } from '@/components/motion-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StructuredData } from '@/components/structured-data'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { absoluteUrl, site } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', weight: ['500', '600', '700', '800'] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Pipe Corporation | Plumbing, Sanitary & Agriculture Fittings in Hyderabad',
    template: '%s | Pipe Corporation',
  },
  description:
    'Pipe Corporation, Hyderabad — trusted distributor since 1999 of G.I, C.I, SS HDP, CPVC, UPVC, SWR pipes & fittings, taps and agriculture fittings. 7,000+ SKUs under one roof.',
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Plumbing, Sanitary & Agricultural Supplies',
  keywords: [
    'Pipe Corporation',
    'plumbing fittings Hyderabad',
    'CPVC pipes and fittings',
    'UPVC pipe fittings',
    'SWR and UGD pipes',
    'SS HDP nipples',
    'G.I fittings ISI',
    'C.I flanges',
    'agriculture fittings',
    'borewell fittings',
    'IZOTI taps',
    'FLOZY taps',
    'Hero Agro Plast',
    'OXYJAL',
    'BOND-WELD solvents',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
    // No `images` here on purpose — `app/opengraph-image.tsx` generates a branded
    // 1200x630 card and the file convention is the single source of truth for it.
    // Declaring `/logo.png` (a 400x336 raster) overrode it and shipped every social
    // card with wrong dimensions.
  },
  twitter: {
    card: 'summary_large_image',
    // `twitter:image` falls back to the file-based Open Graph image.
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl('/logo.png'),
  image: absoluteUrl('/logo.png'),
  description:
    'Distributors of plumbing, sanitary and agricultural pipe fittings and accessories in Hyderabad since 1999.',
  foundingDate: String(site.since),
  email: site.email,
  telephone: site.phoneMain,
  founders: site.founders.map((name) => ({ '@type': 'Person', name })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: site.phoneMain,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'te'],
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HardwareStore',
  '@id': `${site.url}/#business`,
  name: site.name,
  url: site.url,
  image: absoluteUrl('/logo.png'),
  logo: absoluteUrl('/logo.png'),
  description:
    'Wholesale distributor of G.I, C.I, SS HDP, CPVC, UPVC, SWR pipes and fittings, taps, valves and agriculture accessories.',
  telephone: site.phoneMain,
  email: site.email,
  priceRange: site.priceRange,
  currenciesAccepted: 'INR',
  paymentAccepted: site.paymentAccepted.join(', '),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [`https://wa.me/${site.whatsappNumber}`],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: 'en-IN',
  publisher: { '@id': `${site.url}/#organization` },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <WhatsAppFab />
        </MotionProvider>
        <StructuredData data={[organizationSchema, localBusinessSchema, websiteSchema]} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
