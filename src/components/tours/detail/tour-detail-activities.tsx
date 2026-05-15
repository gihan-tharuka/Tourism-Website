'use client'

import { Compass, Sparkles, MapPin, Cloud, Globe2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Tour } from '@/types/tour'

const activityIcons = [Compass, Sparkles, MapPin, Cloud, Globe2]

interface TourDetailActivitiesProps {
  tour: Tour
}

export function TourDetailActivities({ tour }: TourDetailActivitiesProps) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Activities</p>
          <h2 className="text-3xl font-semibold text-white">Experience the journey through authentic moments.</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            Every activity is selected to connect you with the culture, landscapes and luxury travel rhythm of the destination.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tour.activities.map((activity, index) => {
            const Icon = activityIcons[index % activityIcons.length]
            return (
              <motion.div
                key={activity}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.18)]"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-300/10 text-amber-200">
                  <Icon size={22} />
                </div>
                <p className="mt-5 text-xl font-semibold text-white">{activity}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A premium aspect of the tour designed to make every moment feel memorable.
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
