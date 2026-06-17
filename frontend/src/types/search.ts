import type { Tour } from '@/types/tour'

export interface SearchTourImage {
  id: string
  url: string
  alt: string
  tourId: string
}

export interface SearchTourDestination {
  id: string
  slug: string
  name: string
  country: string
  description: string
  image: string
  highlights: string[]
  isFeatured: boolean
}

export interface SearchTourActivity {
  id: string
  title: string
  description: string
  icon: string
  image: string
  estimatedPrice?: string | null
}

export interface SearchTourApiResult {
  id: string
  slug: string
  title: string
  country: Tour['country']
  durationDays: number
  shortDescription: string
  overview: string
  startingPrice: string | number
  priceMin: string | number
  priceMax: string | number
  bestSeason?: string
  groupSize?: string
  featuredImage: string
  isFeatured?: boolean
  images: SearchTourImage[]
  destinations: SearchTourDestination[]
  activities: SearchTourActivity[]
}

export interface TourSearchData {
  query: string
  results: Tour[]
}
