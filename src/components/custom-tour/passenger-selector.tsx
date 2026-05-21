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
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">How many people are traveling?</h3>
        <p className="text-sm text-gray-400">Select your group size</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChange(option.value)}
            className={`rounded-lg border-2 px-6 py-4 font-semibold transition-all duration-300 ${
              value === option.value
                ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                : 'border-white/10 bg-white/5 text-white hover:border-amber-400/50'
            }`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}