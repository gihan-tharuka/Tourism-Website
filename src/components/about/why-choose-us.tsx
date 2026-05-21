'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

const whyChooseUsItems = [
  {
    title: 'Private Tours',
    description: 'Personalized itineraries designed specifically for your interests and preferences.',
  },
  {
    title: 'Local Expertise',
    description: 'Deep knowledge of hidden gems, cultural sites, and authentic Sri Lankan experiences.',
  },
  {
    title: 'Custom Itineraries',
    description: 'Flexible travel plans that adapt to your pace, budget, and travel style.',
  },
  {
    title: 'Premium Transport',
    description: 'Air-conditioned vehicles and professional drivers for comfortable journeys.',
  },
  {
    title: 'Expert Guides',
    description: 'Knowledgeable, engaging guides who share cultural insights and fascinating stories.',
  },
  {
    title: 'Authentic Experiences',
    description: 'Off-the-beaten-path adventures that create meaningful connections with local communities.',
  },
]

export function WhyChooseUs() {
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
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">Why Choose Us</span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">What Sets Us Apart</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-emerald-400/50 hover:bg-white/8"
            >
              
              <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
