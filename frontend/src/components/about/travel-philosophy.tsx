'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

export function TravelPhilosophy() {
  return (
    <section className="border-t border-white/5 py-12 md:py-24">
      <Container>
        <div className="space-y-12">
          {/* Main Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
              Our Philosophy
            </span>
            <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">
              Travel Beyond Boundaries
            </h2>
          </motion.div>

          {/* Philosophy Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Authentic Travel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-2xl font-semibold text-white">Authentic Travel</h3>
              <p className="text-gray-300">
                We believe real travel is about connecting with people and places, not just checking boxes. We create
                opportunities for genuine cultural immersion and meaningful interactions.
              </p>
            </motion.div>

            {/* Meaningful Experiences */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-2xl font-semibold text-white">Meaningful Experiences</h3>
              <p className="text-gray-300">
                Every destination has a story. We&apos;ve learned what makes travel truly memorable—it&apos;s the moments
                that transform you, not just the places you visit.
              </p>
            </motion.div>

            {/* Slow Travel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-2xl font-semibold text-white">Slow Travel Philosophy</h3>
              <p className="text-gray-300">
                We reject rushed itineraries. Spending time in each location allows for deeper exploration, better
                appreciation, and more authentic discoveries.
              </p>
            </motion.div>

            {/* Comfort + Adventure */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-2xl font-semibold text-white">Comfort Meets Adventure</h3>
              <p className="text-gray-300">
                Premium travel shouldn&apos;t mean compromising on adventure. We balance luxury accommodations with
                thrilling experiences for the perfect blend.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
