'use client'

import { motion } from 'framer-motion'

interface PassengerOption {
  label: string
  value: string
}

interface PassengerSelectorProps {
  options: PassengerOption[]
  value: string
  onChange: (value: string) => void
}

export function PassengerSelector({ options, value, onChange }: PassengerSelectorProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      <label className="block text-sm font-semibold text-white">Passenger Count</label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChange(option.value)}
            className={`rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-all duration-300 ${
              value === option.value
                ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                : 'border-white/10 bg-white/5 text-white hover:border-amber-400/50'
            }`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}