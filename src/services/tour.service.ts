import { tours } from '@/data/tours'
import { destinations } from '@/data/destinations'
import type { Tour } from '@/types/tour'

export const getTours = async (): Promise<Tour[]> => {
  return tours
}

export const getTourBySlug = async (slug: string): Promise<Tour | undefined> => {
  return tours.find((tour) => tour.slug === slug)
}

export const getDestinations = async () => {
  return destinations
}

export const getFeaturedTours = async (): Promise<Tour[]> => {
  return tours.slice(0, 3)
}
