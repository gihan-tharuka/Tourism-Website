'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/container'

export function TransferHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-slate-950">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/galle-fort-1050x700-1.jpg"
          alt="Galle Fort, Sri Lanka - scenic coastal destination"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layer overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[500px] items-center py-12">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="mb-4 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
              Premium Transportation
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Private Transfers Across Sri Lanka
          </motion.h1>

          <motion.p
            className="mb-8 text-xl text-gray-200 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Comfortable, reliable, and personalized transport experiences for every journey.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Professional Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Air-Conditioned Vehicles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}