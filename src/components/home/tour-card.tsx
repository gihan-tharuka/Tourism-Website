'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Tour } from '@/types/tour'
import type { Destination } from '@/types/destination'
import { cn } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
  destinations: Destination[]
}

export function TourCard({ tour, destinations }: TourCardProps) {
  const tourDestinations = tour.destinationIds
    .map((id) => destinations.find((destination) => destination.id === id)?.name)
    .filter(Boolean) as string[]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/85 shadow-[0_24px_80px_rgba(15,23,42,0.4)]"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={tour.image}
          alt={`${tour.title} travel image`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200/90">{tour.durationDays} days</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight">{tour.title}</h3>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-sm leading-7 text-slate-300">{tour.summary}</p>
        <div className="flex flex-wrap gap-2">
          {tourDestinations.slice(0, 3).map((destination) => (
            <span
              key={destination}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300"
            >
              {destination}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Starting price</p>
            <p className="mt-1 text-xl font-semibold text-white">${tour.startingPrice.toLocaleString()}</p>
          </div>
          <Link
            href="/tours"
            className={cn(
              'rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200',
            )}
          >
            View tours
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
