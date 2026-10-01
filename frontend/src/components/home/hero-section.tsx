'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { HeroSearchBar } from '@/components/home/hero-search-bar'

export function HeroSection() {
  return (
    <section className="relative isolate -mt-20 flex min-h-[680px] flex-col justify-center sm:min-h-[100svh]">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/homehero2.jpg"
          alt="Sri Lanka tropical coastline and palm trees at sunrise"
          fill
          sizes="100vw"
          priority
          className="animate-ken-burns object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/55 via-deep/15 to-deep/70" />
      </div>

      <Container className="relative z-10 pb-32 pt-32 text-center lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-9"
        >
          <h1 className="font-display text-5xl font-semibold leading-[1.03] tracking-tight text-white text-balance sm:text-7xl lg:text-8xl">
            Discover Sri Lanka,{' '}
            <span className="font-accent italic text-accent">differently</span>
          </h1>

          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
          >
            Explore tours
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>

      {/* Floating trip planner, overlapping the hero edge */}
      <Container className="relative z-10 -mb-12 lg:-mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <HeroSearchBar />
        </motion.div>
      </Container>
    </section>
  )
}
