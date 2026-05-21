'use client'

import { motion } from 'framer-motion'

interface PricingSummaryProps {
  pickupName: string
  dropoffName: string
  estimatedPrice: number
  vehicleName?: string
  passengerCount: string
}

export function PricingSummary({
  pickupName,
  dropoffName,
  estimatedPrice,
  vehicleName,
  passengerCount,
}: PricingSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-blue-400/5 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">💰 Estimated Price</h3>
        <div className="text-right">
          <p className="text-4xl font-bold text-amber-300">${estimatedPrice}</p>
          <p className="text-xs text-gray-400">estimated total</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>From:</span>
          <span className="font-semibold text-white">{pickupName}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>To:</span>
          <span className="font-semibold text-white">{dropoffName}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Passengers:</span>
          <span className="font-semibold text-white">{passengerCount}</span>
        </div>
        {vehicleName && (
          <div className="flex justify-between text-gray-300">
            <span>Vehicle:</span>
            <span className="font-semibold text-white">{vehicleName}</span>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        * Final pricing will be confirmed by our team based on current conditions and availability.
      </p>
    </motion.div>
  )
}
