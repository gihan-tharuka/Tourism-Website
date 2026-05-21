'use client'

import { motion } from 'framer-motion'
import type { BudgetRange } from '@/types/custom-tour'

interface BudgetSelectorProps {
  options: BudgetRange[]
  value: 'budget' | 'standard' | 'luxury'
  onChange: (value: 'budget' | 'standard' | 'luxury') => void
}

export function BudgetSelector({ options, value, onChange }: BudgetSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">What's your budget?</h3>
        <p className="text-sm text-gray-400">Select your daily budget range</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChange(option.value)}
            className={`group rounded-lg border-2 p-6 text-left transition-all duration-300 ${
              value === option.value
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-white/10 bg-white/5 hover:border-amber-400/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className={`mb-1 font-semibold ${value === option.value ? 'text-amber-300' : 'text-white'}`}>
                  {option.label}
                </h4>
                <p className="mb-3 text-sm text-gray-400">{option.description}</p>
                <p className="font-bold text-amber-300">{option.priceRange}</p>
              </div>

              {value === option.value && (
                <div className="rounded-full bg-amber-400 p-1">
                  <svg className="h-5 w-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}