'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import type { Destination } from '@/types/destination'

interface FeaturedDestinationsProps {
  destinations: Destination[]
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  return (
    <section className="border-t border-white/5 py-12 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Explore Sri Lanka
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Featured Destinations</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {destinations.slice(0, 5).map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                <p className="text-sm text-gray-300">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
