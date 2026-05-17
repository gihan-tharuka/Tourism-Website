'use client'

import { motion } from 'framer-motion'
import type { RecommendedStop } from '@/types/transfer'

interface RecommendedStopsProps {
  stops: RecommendedStop[]
}

export function RecommendedStops({ stops }: RecommendedStopsProps) {
  if (!stops || stops.length === 0) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">✨ Recommended Stops on Route</h3>
        <p className="text-sm text-gray-400">Optional attractions along your journey</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {stops.map((stop, index) => (
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/8"
          >
            <span className="flex-shrink-0 text-2xl">{stop.icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-white">{stop.name}</h4>
              <p className="text-sm text-gray-400">{stop.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
