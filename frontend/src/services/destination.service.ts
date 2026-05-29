import type { Destination } from '@/types/destination'
import { destinations } from '@/data/destinations'

export const getDestinations = async (): Promise<Destination[]> => {
  return destinations
}

export const getDestinationNames = (ids: string[], all: Destination[]) => {
  return ids
    .map((id) => all.find((destination) => destination.id === id)?.name)
    .filter(Boolean) as string[]
}
