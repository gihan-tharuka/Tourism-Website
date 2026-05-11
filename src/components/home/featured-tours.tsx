'use client'

import { motion } from 'framer-motion'
import type { Tour } from '@/types/tour'
import type { Destination } from '@/types/destination'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TourCard } from '@/components/home/tour-card'

interface FeaturedToursProps {
  tours: Tour[]
  destinations: Destination[]
}

export function FeaturedTours({ tours, destinations }: FeaturedToursProps) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured tours"
          title="Premium tours designed for immersive luxury travel."
          description="Each journey is carefully curated with private guides, exclusive stays and seamless transport across Sri Lanka." 
          align="left"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} destinations={destinations} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
