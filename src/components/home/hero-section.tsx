'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

const trustPoints = ['Private Tours', 'Local Guides', 'Custom Itineraries', '24/7 Support']

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0">
        <Image
          src="/images/sigiriya2.avif"
          alt="Sigiriya Rock Fortress, Sri Lanka"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-950/90 to-transparent" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl space-y-8"
        >
          <div className="space-y-4 text-center sm:text-left">
            <span className="inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.36em] text-amber-200">
              Luxury island journeys
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Discover Sri Lanka Beyond The Ordinary
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:mx-0 sm:text-lg">
              Luxury curated travel experiences across Sri Lanka, Thailand, and Malaysia with private guides, premium transfers, and unforgettable local discoveries.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            <Link
              href="/tours"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
            >
              Explore Tours
            </Link>
            <Link
              href="/custom-tour"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-amber-200 hover:bg-white/10"
            >
              Custom Tour
            </Link>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 px-5 py-6 text-sm text-slate-300 shadow-[0_28px_90px_rgba(15,23,42,0.25)] sm:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-3xl bg-white/5 px-4 py-4 text-center text-xs uppercase tracking-[0.28em] text-slate-300 shadow-inner shadow-slate-950/10">
                {point}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
