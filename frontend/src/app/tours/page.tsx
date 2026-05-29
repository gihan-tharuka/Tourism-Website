import { getFeaturedTours, getTours } from '@/services/tour.service'
import { ToursPageContent } from '@/components/tours/tours-page-content'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Sri Lanka Tour Packages | Beyond Sea Travels',
  description:
    'Explore premium tour packages across Sri Lanka, Thailand, and Malaysia. Discover luxury itineraries, private transfers, and curated travel experiences.',
  pathname: '/tours',
  keywords: ['Sri Lanka tour packages', 'luxury tour packages', 'private Sri Lanka itineraries'],
})

export default async function ToursPage() {
  const [tours, featuredTours] = await Promise.all([getTours(), getFeaturedTours()])

  return <ToursPageContent tours={tours} featuredTours={featuredTours} />
}
