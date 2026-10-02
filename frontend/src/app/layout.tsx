import type { Metadata } from 'next'
import { Fraunces, Manrope, Sora } from 'next/font/google'
import './globals.css'
import { SiteLayout } from '@/components/layout/site-layout'
import { SITE_URL } from '@/lib/constants'
import { createPageMetadata, createTravelAgencyJsonLd, JsonLd } from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/brand/site.webmanifest',
  ...createPageMetadata({
    title: 'IslandSea Travels',
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
      className={`${manrope.variable} ${sora.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <JsonLd data={createTravelAgencyJsonLd()} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
