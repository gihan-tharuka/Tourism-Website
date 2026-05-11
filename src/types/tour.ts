export interface Tour {
  id: string
  title: string
  slug: string
  durationDays: number
  startingPrice: number
  summary: string
  destinationIds: string[]
  image: string
  highlights: string[]
  itinerary: Array<{ day: number; title: string; description: string }>
}
