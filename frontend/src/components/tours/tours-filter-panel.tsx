'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const countries = ['Sri Lanka', 'Thailand', 'Malaysia'] as const
const durations = [4, 7, 14, 20] as const

interface ToursFilterPanelProps {
  country: string
  duration: number | null
  onCountryChange: (country: string) => void
  onDurationChange: (duration: number | null) => void
  onReset: () => void
}

export function ToursFilterPanel({
  country,
  duration,
  onCountryChange,
  onDurationChange,
  onReset,
}: ToursFilterPanelProps) {
  const activeFilters = useMemo(() => {
    return [country !== 'All', duration !== null].filter(Boolean).length
  }, [country, duration])

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Filter tours</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Refine your search</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            Select a destination and duration to find the perfect private itinerary for your luxury travels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={onReset}>
            Reset filters
          </Button>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
            {activeFilters} filters
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Country</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onCountryChange('All')}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition',
                country === 'All'
                  ? 'border-amber-300 bg-amber-300/10 text-amber-200'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300 hover:text-white',
              )}
            >
              All
            </button>
            {countries.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onCountryChange(value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition',
                  country === value
                    ? 'border-amber-300 bg-amber-300/10 text-amber-200'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300 hover:text-white',
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Duration</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onDurationChange(null)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition',
                duration === null
                  ? 'border-amber-300 bg-amber-300/10 text-amber-200'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300 hover:text-white',
              )}
            >
              All
            </button>
            {durations.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onDurationChange(value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition',
                  duration === value
                    ? 'border-amber-300 bg-amber-300/10 text-amber-200'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-300 hover:text-white',
                )}
              >
                {value} Days
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
