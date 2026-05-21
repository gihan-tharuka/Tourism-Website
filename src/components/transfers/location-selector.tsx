'use client'

import { motion } from 'framer-motion'
import type { TransferLocation } from '@/types/transfer'

interface LocationSelectorProps {
  label: string
  locations: TransferLocation[]
  value: string
  onChange: (value: string) => void
  disabledValue?: string
}

export function LocationSelector({
  label,
  locations,
  value,
  onChange,
  disabledValue,
}: LocationSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-white">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
      >
        <option value="">Select a location...</option>
        {locations.map((location) => (
          <option
            key={location.id}
            value={location.id}
            disabled={location.id === disabledValue}
            className="bg-slate-900 text-white"
          >
            {location.name}
          </option>
        ))}
      </select>
    </motion.div>
  )
}