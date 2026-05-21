'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Tour } from '@/types/tour'

interface TourDetailItineraryProps {
  tour: Tour
}

export function TourDetailItinerary({ tour }: TourDetailItineraryProps) {
  const [openDay, setOpenDay] = useState(1)

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Itinerary</p>
          <h2 className="text-3xl font-semibold text-white">Day-by-day journey details.</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            Explore each day with clear locations, activities and memorable highlights designed for effortless luxury travel.
          </p>
        </div>

        <div className="space-y-4">
          {tour.itinerary.map((item) => {
            const isOpen = openDay === item.day
            return (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/85 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenDay(item.day)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-amber-200/80">Day {item.day}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    {item.location ? <p className="mt-2 text-sm text-slate-400">{item.location}</p> : null}
                  </div>
                  <ChevronDown
                    size={24}
                    className={`transition duration-300 ${isOpen ? 'rotate-180 text-amber-200' : 'text-slate-400'}`}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-white/10 bg-slate-900/80 px-6 py-6 text-slate-300">
                    <p className="text-sm leading-7">{item.description}</p>
                  </div>
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
