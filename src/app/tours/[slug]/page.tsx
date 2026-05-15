import { notFound } from 'next/navigation'
import { getTourBySlug, getTours } from '@/services/tour.service'
import { TourDetailHero } from '@/components/tours/detail/tour-detail-hero'
import { TourDetailQuickInfo } from '@/components/tours/detail/tour-detail-quick-info'
import { TourDetailOverview } from '@/components/tours/detail/tour-detail-overview'
import { TourDetailGallery } from '@/components/tours/detail/tour-detail-gallery'
import { TourDetailItinerary } from '@/components/tours/detail/tour-detail-itinerary'
import { TourDetailActivities } from '@/components/tours/detail/tour-detail-activities'
import { TourDetailPricing } from '@/components/tours/detail/tour-detail-pricing'
import { TourDetailVehicles } from '@/components/tours/detail/tour-detail-vehicles'
import { TourDetailCTA } from '@/components/tours/detail/tour-detail-cta'
import { TourDetailRelated } from '@/components/tours/detail/tour-detail-related'
import type { Metadata } from 'next'

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour) {
    return {
      title: 'Tour Not Found | Beyond Sea Travels',
      description: 'The requested tour could not be found.',
    }
  }

  return {
    title: `${tour.title} | ${tour.country} Tour Package | Beyond Sea Travels`,
    description: `${tour.title} is a ${tour.durationDays}-day luxury tour in ${tour.country}, featuring ${tour.highlights.join(", ")} and private travel experiences.`,
    openGraph: {
      title: `${tour.title} | Beyond Sea Travels`,
      description: `${tour.title} is a ${tour.durationDays}-day luxury tour in ${tour.country}, featuring ${tour.highlights.join(", ")}.`,
      images: [tour.image],
    },
  }
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  const allTours = await getTours()
  const relatedTours = allTours
    .filter((item) => item.id !== tour.id && item.country === tour.country)
    .slice(0, 3)

  return (
    <main className="overflow-hidden">
      <TourDetailHero tour={tour} />
      <div className="relative bg-slate-950/95 py-12">
        <TourDetailQuickInfo tour={tour} />
        <TourDetailOverview tour={tour} />
        <TourDetailGallery tour={tour} />
        <TourDetailItinerary tour={tour} />
        <TourDetailActivities tour={tour} />
        <TourDetailPricing tour={tour} />
        <TourDetailVehicles />
        <TourDetailCTA tour={tour} />
        <TourDetailRelated tours={relatedTours} />
      </div>
    </main>
  )
}
