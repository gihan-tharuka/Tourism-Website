export interface Tour {
  id: string
  title: string
  slug: string
  durationDays: number
  startingPrice: number
  summary: string
  destinationIds: string[]
  country: 'Sri Lanka' | 'Thailand' | 'Malaysia'
  isFeatured?: boolean
  image: string
  images: string[]
  activities: string[]
  priceRange: string
  bestSeason?: string
  groupSize?: string
  highlights: string[]
  itinerary: Array<{ day: number; title: string; location?: string; description: string }>
}
