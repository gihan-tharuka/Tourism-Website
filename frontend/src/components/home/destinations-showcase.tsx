'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Destination } from '@/types/destination'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

interface DestinationsShowcaseProps {
  destinations: Destination[]
}

export function DestinationsShowcase({ destinations }: DestinationsShowcaseProps) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Destination highlights"
          title="Discover Sri Lanka’s most iconic places, styled for luxury travel."
          description="From ancient rock fortresses to peaceful coastal escapes, each destination is designed to inspire your next private journey."
          align="left"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.25)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-amber-200/90">{destination.country}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{destination.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
