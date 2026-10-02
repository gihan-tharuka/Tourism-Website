'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Tour } from '@/types/tour'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal, staggerDelay } from '@/components/ui/reveal'
import { TourCard } from '@/components/home/tour-card'

interface FeaturedToursProps {
  tours: Tour[]
  /** Maps raw destination ids to human-readable names for display. */
  destinationLabels?: Record<string, string>
}

export function FeaturedTours({ tours, destinationLabels }: FeaturedToursProps) {
  if (!tours.length) {
    return null
  }

  return (
    <Section tone="surface" className="pt-28 lg:pt-36">
      <Container>
        <SectionHeading
          eyebrow="Featured tours"
          title="Premium tours designed for immersive luxury travel."
          description="Each journey is carefully curated with private guides, exclusive stays and seamless transport across Sri Lanka."
          align="left"
          action={
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              View all tours
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <Reveal key={tour.id} delay={staggerDelay(index)} className="h-full">
              <TourCard
                tour={tour}
                destinationLabels={tour.destinationIds.map(
                  (id) => destinationLabels?.[id] ?? id,
                )}
                href={`/tours/${tour.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
