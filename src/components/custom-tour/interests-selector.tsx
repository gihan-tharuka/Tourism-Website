'use client'

import { motion } from 'framer-motion'

interface InterestOption {
  id: string
  label: string
  icon: string
}

interface InterestsSelectorProps {
  options: InterestOption[]
  selected: string[]
  onChange: (interests: string[]) => void
}

export function InterestsSelector({ options, selected, onChange }: InterestsSelectorProps) {
  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((i) => i !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">What interests you most?</h3>
        <p className="text-sm text-gray-400">Select one or more interests</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleInterest(option.id)}
            className={`group flex items-center gap-3 rounded-lg border-2 p-4 transition-all duration-300 ${
              selected.includes(option.id)
                ? 'border-emerald-400 bg-emerald-400/10'
                : 'border-white/10 bg-white/5 hover:border-emerald-400/50'
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className={`font-medium ${selected.includes(option.id) ? 'text-emerald-300' : 'text-white'}`}>
              {option.label}
            </span>

            {selected.includes(option.id) && (
              <div className="ml-auto rounded-full bg-emerald-400 p-1">
                <svg className="h-4 w-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
