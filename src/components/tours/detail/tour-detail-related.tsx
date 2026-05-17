'use client'

import { TourCard } from '@/components/home/tour-card'
import type { Tour } from '@/types/tour'

interface TourDetailRelatedProps {
  tours: Tour[]
}

export function TourDetailRelated({ tours }: TourDetailRelatedProps) {
  if (!tours.length) {
    return null
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Related tours</p>
          <h2 className="text-3xl font-semibold text-white">Explore similar journeys.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} href={`/tours/${tour.slug}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
