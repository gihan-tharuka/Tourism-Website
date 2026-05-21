'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

const supportReasons = [
  {
    title: 'Custom Itineraries',
    description: 'Need a tailored travel plan? We create bespoke itineraries matching your interests and budget.',
  },
  {
    title: 'Airport Transfers',
    description: 'Professional airport pickups and drop-offs with reliable, air-conditioned vehicles.',
  },
  {
    title: 'Honeymoon Planning',
    description: 'Romantic getaways with luxury accommodations, private tours, and intimate experiences.',
  },
  {
    title: 'Private Tours',
    description: 'Personalized guided tours with expert local knowledge and flexible scheduling.',
  },
  {
    title: 'Group Travel',
    description: 'Organize group adventures with coordinated logistics and team-building activities.',
  },
  {
    title: 'Travel Assistance',
    description: 'Emergency support, travel recommendations, and 24/7 assistance during your journey.',
  },
]

export function TravelerSupport() {
  return (
    <section className="border-t border-white/5 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            How We Help
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Why Travelers Contact Us</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-amber-400/50 hover:bg-white/8"
            >
              <h3 className="mb-2 font-semibold text-white">{reason.title}</h3>
              <p className="text-sm text-gray-400">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}