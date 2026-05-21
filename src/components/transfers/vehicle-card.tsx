'use client'

import { motion } from 'framer-motion'
import type { VehicleType } from '@/types/transfer'

interface VehicleCardProps {
  vehicle: VehicleType | null
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  if (!vehicle) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-gray-400">Recommended Vehicle</p>
          <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold text-amber-300">
            {vehicle.name}
          </h3>
          <p className="mb-3 text-sm text-gray-300">{vehicle.description}</p>

          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="font-semibold">Capacity:</span> {vehicle.passengers}
            </p>
            <p>
              <span className="font-semibold">Luggage:</span> {vehicle.luggage}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}