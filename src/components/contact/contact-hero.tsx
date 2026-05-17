'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

export function ContactHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-slate-950">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Multi-layer overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
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
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              💬 Get In Touch
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Let&apos;s Plan Your Journey
          </motion.h1>

          <motion.p
            className="mb-8 text-xl text-gray-200 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Whether you&apos;re planning a luxury escape, cultural adventure, or private transfer, our team is ready to help.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span>Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🌍</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Expert Team</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
