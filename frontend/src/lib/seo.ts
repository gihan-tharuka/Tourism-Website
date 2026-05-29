import type { Metadata } from 'next'
import { createElement } from 'react'
import { DEFAULT_META_DESCRIPTION, SITE_URL } from '@/lib/constants'
import type { Tour } from '@/types/tour'

const SITE_NAME = 'Beyond Sea Travels'
const DEFAULT_OG_IMAGE = '/og/beyond-sea-travels.jpg'
const DEFAULT_KEYWORDS = [
  'Sri Lanka luxury tours',
  'Sri Lanka private tours',
  'Beyond Sea Travels',
  'custom Sri Lanka itinerary',
  'Sri Lanka transfers',
  'luxury travel Sri Lanka',
]

type FaqItem = {
  question: string
  answer: string
}

interface PageMetadataInput {
  title: string
  description?: string
  pathname?: string
  keywords?: string[]
  image?: string
}

export const canonicalPath = (pathname = '/') => {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '')
}

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${SITE_URL}${canonicalPath(path)}`
}

export const createPageMetadata = ({
  title,
  description = DEFAULT_META_DESCRIPTION,
  pathname = '/',
  keywords = [],
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata => {
  const canonical = canonicalPath(pathname)
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const imageUrl = absoluteUrl(image)

  return {
    title: pageTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} luxury Sri Lanka travel`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  }
}

export const createTourMetadata = (tour: Tour): Metadata => {
  const description = `${tour.title} is a ${tour.durationDays}-day luxury ${tour.country} tour featuring ${tour.highlights.join(', ')} with private travel support.`

  return createPageMetadata({
    title: `${tour.title} | ${tour.country} Tour Package`,
    description,
    pathname: `/tours/${tour.slug}`,
    image: tour.image,
    keywords: [
      tour.title,
      `${tour.country} tour package`,
      `${tour.durationDays} day Sri Lanka itinerary`,
      ...tour.highlights,
      ...tour.activities,
    ],
  })
}

export const safeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

export function JsonLd({ data }: { data: unknown }) {
  return createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: safeJsonLd(data) },
  })
}

export const createTravelAgencyJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: DEFAULT_META_DESCRIPTION,
  areaServed: ['Sri Lanka', 'Thailand', 'Malaysia'],
  serviceType: ['Luxury tours', 'Custom itineraries', 'Private transfers'],
  email: 'info@beyondseatravels.com',
})

export const createFaqJsonLd = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer.replace(/&apos;/g, "'"),
    },
  })),
})

export const createTourPackageJsonLd = (tour: Tour) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: tour.title,
  url: absoluteUrl(`/tours/${tour.slug}`),
  image: tour.images.map((image) => absoluteUrl(image)),
  description: tour.summary,
  touristType: 'Luxury traveler',
  itinerary: {
    '@type': 'ItemList',
    itemListElement: tour.itinerary.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.description,
    })),
  },
  offers: {
    '@type': 'Offer',
    price: tour.startingPrice,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: absoluteUrl(`/tours/${tour.slug}`),
  },
  provider: {
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: SITE_URL,
  },
})

export const generateSeoMetadata = createPageMetadata
