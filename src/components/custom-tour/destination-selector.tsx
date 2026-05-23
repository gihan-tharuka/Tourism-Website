'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Destination } from '@/types/destination'

interface DestinationSelectorProps {
  destinations: Destination[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function DestinationSelector({ destinations, selectedIds, onChange }: DestinationSelectorProps) {
  const toggleDestination = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((d) => d !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-white">Which destinations interest you?</h3>
        <p className="text-sm text-gray-400">Select one or more destinations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <motion.button
            key={destination.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleDestination(destination.id)}
            className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              selectedIds.includes(destination.id)
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-white/10 bg-white/5 hover:border-amber-400/50'
            }`}
          >
            <div className="relative h-40 w-full">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="absolute inset-0 flex items-end p-4">
              <div className="w-full text-left">
                <h4 className="font-semibold text-white">{destination.name}</h4>
                <p className="text-xs text-gray-300">{destination.description}</p>
              </div>
            </div>

            {selectedIds.includes(destination.id) && (
              <div className="absolute right-3 top-3 rounded-full bg-amber-400 p-1">
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
