'use client'

import { motion } from 'framer-motion'
import type { ItineraryDay } from '@/types/custom-tour'

interface ItineraryPreviewProps {
  itinerary: ItineraryDay[]
  isLoading?: boolean
}

export function ItineraryPreview({ itinerary, isLoading }: ItineraryPreviewProps) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg border-2 border-dashed border-white/10 bg-white/5 p-8 text-center"
      >
        <p className="text-sm text-gray-400">
          {isLoading
            ? 'Generating your itinerary...'
            : 'Complete the form to see your suggested itinerary'}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">Your Suggested Itinerary</h3>
        <p className="text-sm text-gray-400">Based on your preferences</p>
      </div>

      <div className="space-y-3">
        {itinerary.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/8"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20">
              <span className="font-bold text-amber-300">Day {day.day}</span>
            </div>

            <div className="flex-1">
              <h4 className="mb-1 font-semibold text-white">{day.destination}</h4>
              <div className="space-y-1">
                {day.activities.map((activity, i) => (
                  <p key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-amber-300">•</span>
                    {activity}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: itinerary.length * 0.1 }}
        className="mt-4 flex items-center gap-2 rounded-lg bg-amber-400/10 p-4 text-sm text-amber-300"
      >
        <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Send this itinerary to Beyond Sea Travels for customization!</span>
      </motion.div>
    </motion.div>
  )
}