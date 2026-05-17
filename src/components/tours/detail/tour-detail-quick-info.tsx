'use client'

import { Clock3, MapPin, Users, CalendarDays, DollarSign } from 'lucide-react'
import type { Tour } from '@/types/tour'

const infoItems = [
  { label: 'Duration', icon: Clock3, key: 'durationDays' },
  { label: 'Country', icon: MapPin, key: 'country' },
  { label: 'Group size', icon: Users, key: 'groupSize' },
  { label: 'Best season', icon: CalendarDays, key: 'bestSeason' },
  { label: 'Price range', icon: DollarSign, key: 'priceRange' },
] as const

interface TourDetailQuickInfoProps {
  tour: Tour
}

export function TourDetailQuickInfo({ tour }: TourDetailQuickInfoProps) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_26px_90px_rgba(15,23,42,0.25)] backdrop-blur-2xl sm:p-8">
        <div className="grid gap-4 sm:grid-cols-5">
          {infoItems.map((item) => {
            const Icon = item.icon
            const value = item.key === 'durationDays'
              ? `${tour.durationDays} days`
              : tour[item.key] ?? 'N/A'
            return (
              <div key={item.label} className="flex items-start gap-4 rounded-3xl bg-slate-900/80 p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-300/10 text-amber-200">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
