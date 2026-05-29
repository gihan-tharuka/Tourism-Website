'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

export function CustomTourCTA() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-[3rem] border border-amber-300/10 bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 p-8 shadow-[0_30px_90px_rgba(251,191,36,0.15)] sm:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Build your journey</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Custom itineraries for travelers who want the extraordinary.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Share your dates, interests and pace. We will create a premium route with private transfers, curated stays, and memorable local encounters.
              </p>
            </div>

            <div className="flex items-center justify-start lg:justify-end">
              <Link
                href="/custom-tour"
                className="inline-flex rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
              >
                Build Your Custom Tour
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
