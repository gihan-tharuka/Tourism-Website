import { getFeaturedTours, getTours } from '@/services/tour.service'
import { ToursPageContent } from '@/components/tours/tours-page-content'

export const metadata = {
  title: 'Sri Lanka Tour Packages | Beyond Sea Travels',
  description:
    'Explore premium tour packages across Sri Lanka, Thailand, and Malaysia. Discover luxury itineraries, private transfers, and curated travel experiences.',
}

export default async function ToursPage() {
  const [tours, featuredTours] = await Promise.all([getTours(), getFeaturedTours()])

  return <ToursPageContent tours={tours} featuredTours={featuredTours} />
}
