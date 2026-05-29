'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

const stats = [
  {
    number: '500+',
    label: 'Happy Travelers',
    description: 'From around the world',
  },
  {
    number: '50+',
    label: 'Curated Experiences',
    description: 'Unique tours and activities',
  },
  {
    number: '24/7',
    label: 'Customer Support',
    description: 'Always here to help',
  },
  {
    number: '15+',
    label: 'Destinations',
    description: 'Across Sri Lanka',
  },
]

export function ExperienceStats() {
  return (
    <section className="border-t border-white/5 py-12 md:py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-4">
                <p className="text-5xl font-bold text-amber-300 md:text-6xl">{stat.number}</p>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{stat.label}</h3>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
