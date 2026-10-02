'use client'

import Image from 'next/image'
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react'
import type { Tour } from '@/types/tour'
import { SiteLink } from '@/components/ui/site-link'

interface TourCardProps {
  tour: Tour
  /** Optional human-readable destination names (falls back to raw ids). */
  destinationLabels?: string[]
  href?: string
}

export function TourCard({ tour, destinationLabels, href }: TourCardProps) {
  const destinations = destinationLabels ?? tour.destinationIds
  const link = href ?? `/tours/${tour.slug}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-float">
      <SiteLink href={link} className="relative block aspect-[4/5] overflow-hidden">
        <Image
          src={tour.image}
          alt={`${tour.title} travel image`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/25 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          {tour.durationDays} days
        </span>
        <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-semibold leading-tight text-white">
          {tour.title}
        </h3>
      </SiteLink>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="line-clamp-2 text-sm leading-7 text-muted-foreground">{tour.summary}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" aria-hidden="true" />
            {destinations.slice(0, 3).join(' · ')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-primary" aria-hidden="true" />
            {tour.durationDays} days
          </span>
          {tour.groupSize ? (
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} className="text-primary" aria-hidden="true" />
              {tour.groupSize}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-end gap-4 border-t border-border pt-4">
          <SiteLink
            href={link}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            View tour
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </SiteLink>
        </div>
      </div>
    </article>
  )
}
