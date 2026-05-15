'use client'

import { motion } from 'framer-motion'

interface DurationSelectorProps {
  value: number | 'custom'
  onChange: (value: number | 'custom') => void
}

const durationOptions = [
  { label: '4 Days', value: 4 },
  { label: '7 Days', value: 7 },
  { label: '14 Days', value: 14 },
  { label: '20 Days', value: 20 },
]

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">How many days do you have?</h3>
        <p className="text-sm text-gray-400">Select your ideal trip duration</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {durationOptions.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChange(option.value)}
            className={`rounded-lg border-2 px-6 py-4 font-semibold transition-all duration-300 ${
              value === option.value
                ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                : 'border-white/10 bg-white/5 text-white hover:border-emerald-400/50'
            }`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: durationOptions.length * 0.05 }}
        onClick={() => onChange('custom')}
        className={`w-full rounded-lg border-2 px-6 py-4 font-semibold transition-all duration-300 ${
          value === 'custom'
            ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
            : 'border-white/10 bg-white/5 text-white hover:border-emerald-400/50'
        }`}
      >
        Custom Duration
      </motion.button>
    </div>
  )
}
