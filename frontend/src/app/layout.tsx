import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SiteLayout } from '@/components/layout/site-layout'
import { SITE_URL } from '@/lib/constants'
import { createPageMetadata, createTravelAgencyJsonLd, JsonLd } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/beyond-sea-travels-favicon-yellow/site.webmanifest',
  ...createPageMetadata({
    title: 'Beyond Sea Travels',
    description:
      'Luxury Sri Lanka travel and private tours crafted for immersive experiences, seamless transfers, and premium service.',
    pathname: '/',
  }),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased text-slate-100`}
    >
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <JsonLd data={createTravelAgencyJsonLd()} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
