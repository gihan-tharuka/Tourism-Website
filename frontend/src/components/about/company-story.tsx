'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/container'

export function CompanyStory() {
  return (
    <section className="border-t border-white/5 py-12 md:py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">Our Journey</span>
              <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Built on Passion for Travel</h2>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                Beyond Sea Travels was founded by travel enthusiasts who fell in love with Sri Lanka&apos;s beauty,
                culture, and people. We realized that most travelers deserved more than generic tours—they deserved
                personalized, authentic experiences.
              </p>

              <p className="text-lg leading-relaxed">
                Today, we specialize in crafting bespoke itineraries that blend adventure, culture, and comfort. Every
                journey we create reflects our commitment to excellence, sustainability, and deep local knowledge.
              </p>

              <p className="text-lg leading-relaxed">
                We&apos;re not just tour operators. We&apos;re storytellers, cultural ambassadors, and trusted guides who
                transform ordinary trips into extraordinary memories.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-semibold text-white">Our Mission</p>
                  <p className="text-sm text-gray-400">To create personalized, authentic travel experiences that connect people with Sri Lanka&apos;s culture, nature, and people.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-semibold text-white">Our Vision</p>
                  <p className="text-sm text-gray-400">To be Sri Lanka&apos;s most trusted luxury travel partner for meaningful, transformative journeys.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
          >
            <Image
              src="/images/Ella_sri_lanka.jpg"
              alt="Ella Sri Lanka - scenic landscape"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-slate-950/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
