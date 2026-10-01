'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const destinations = [
  'Anywhere in Sri Lanka',
  'Ella',
  'Kandy',
  'Galle',
  'Mirissa',
  'Sigiriya',
  'Nuwara Eliya',
]

const experiences = [
  'Any experience',
  'Culture & Heritage',
  'Wildlife & Safari',
  'Beaches & Coast',
  'Hill Country',
  'Wellness & Retreats',
]

const travellerOptions = ['1 traveller', '2 travellers', '3-4 travellers', '5+ travellers']

export function HeroSearchBar({ className }: { className?: string }) {
  const router = useRouter()
  const [destination, setDestination] = useState(destinations[0])
  const [experience, setExperience] = useState(experiences[0])
  const [travellers, setTravellers] = useState(travellerOptions[1])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams({
      destination,
      experience,
      travellers,
    })
    router.push(`/tours?${params.toString()}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'grid gap-2 rounded-3xl border border-border/70 bg-white p-2 shadow-float sm:grid-cols-2 lg:grid-cols-[1.4fr_1.4fr_1fr_auto]',
        className,
      )}
    >
      <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-secondary/70">
        <MapPin size={18} className="text-primary" aria-hidden="true" />
        <span className="flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Destination
          </span>
          <select
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-foreground focus:outline-none"
          >
            {destinations.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </span>
      </label>

      <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-secondary/70 lg:border-l lg:border-border">
        <Sparkles size={18} className="text-primary" aria-hidden="true" />
        <span className="flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Experience
          </span>
          <select
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-foreground focus:outline-none"
          >
            {experiences.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </span>
      </label>

      <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-secondary/70 lg:border-l lg:border-border">
        <Users size={18} className="text-primary" aria-hidden="true" />
        <span className="flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Travellers
          </span>
          <select
            value={travellers}
            onChange={(event) => setTravellers(event.target.value)}
            className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-foreground focus:outline-none"
          >
            {travellerOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Search size={18} aria-hidden="true" />
        Search
      </button>
    </form>
  )
}