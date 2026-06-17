import { ApiError, fetchJson } from '@/lib/fetcher'
import type { Tour } from '@/types/tour'
import type { SearchTourApiResult, TourSearchData } from '@/types/search'

const toNumber = (value: string | number) => Number(value)

const toPriceRange = (tour: SearchTourApiResult) => {
  const min = toNumber(tour.priceMin)
  const max = toNumber(tour.priceMax)

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return 'Custom quote'
  }

  return `$${min.toLocaleString()}-${max.toLocaleString()}`
}

const mapSearchTour = (tour: SearchTourApiResult): Tour => ({
  id: tour.id,
  title: tour.title,
  slug: tour.slug,
  durationDays: tour.durationDays,
  startingPrice: toNumber(tour.startingPrice),
  summary: tour.shortDescription,
  destinationIds: tour.destinations.map((destination) => destination.name),
  country: tour.country,
  isFeatured: tour.isFeatured,
  image: tour.featuredImage,
  images: tour.images.map((image) => image.url),
  activities: tour.activities.map((activity) => activity.title),
  priceRange: toPriceRange(tour),
  bestSeason: tour.bestSeason,
  groupSize: tour.groupSize,
  highlights: tour.destinations.flatMap((destination) => destination.highlights).slice(0, 6),
  itinerary: [],
})

export async function searchTours(query: string, limit = 12): Promise<TourSearchData> {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
  })

  const response = await fetchJson<{ query: string; results: SearchTourApiResult[] }>(
    `/search/tours?${params.toString()}`,
  )

  if (!response.data) {
    throw new ApiError('Search response did not include data.', 500)
  }

  return {
    query: response.data.query,
    results: response.data.results.map(mapSearchTour),
  }
}
