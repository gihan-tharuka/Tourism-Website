'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Tour } from '@/types/tour'
import { TourInquiryButton } from './tour-inquiry-button'

interface TourDetailHeroProps {
  tour: Tour
}

export function TourDetailHero({ tour }: TourDetailHeroProps) {
  const message = `Hello Beyond Sea Travels, I would like to book the ${tour.title} (${tour.durationDays} days, ${tour.country}). Please send more details.`

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="relative h-[620px] sm:h-[680px]">
        <Image
          src={tour.image}
          alt={`${tour.title} background`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-slate-950/95" />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.35)] backdrop-blur-3xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.36em] text-amber-200">
            {tour.country}
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            {tour.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {tour.summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Duration</p>
              <p className="mt-2 font-semibold text-white">{tour.durationDays} days</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Starting price</p>
              <p className="mt-2 font-semibold text-white">${tour.startingPrice.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Best season</p>
              <p className="mt-2 font-semibold text-white">{tour.bestSeason ?? 'Year round'}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <TourInquiryButton
              tour={tour}
              message={message}
              source="tour-detail-hero"
              className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
            >
              Book on WhatsApp
            </TourInquiryButton>
            <Link
              href="/custom-tour"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-amber-200 hover:bg-white/10"
            >
              Customize This Tour
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
