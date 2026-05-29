'use client'

import { TourCard } from '@/components/home/tour-card'
import type { Tour } from '@/types/tour'
import { SectionHeading } from '@/components/ui/section-heading'

interface FeaturedPreviewProps {
  featuredTours: Tour[]
}

export function FeaturedPreview({ featuredTours }: FeaturedPreviewProps) {
  if (!featuredTours.length) {
    return null
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Most popular tours"
          title="Book the itineraries our guests love most."
          description="These premium journeys are curated for those seeking the best luxury travel experiences in Sri Lanka." 
          align="left"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} href={`/tours/${tour.slug}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
