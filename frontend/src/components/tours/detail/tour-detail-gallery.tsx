'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Tour } from '@/types/tour'

interface TourDetailGalleryProps {
  tour: Tour
}

export function TourDetailGallery({ tour }: TourDetailGalleryProps) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Gallery</p>
          <h2 className="text-3xl font-semibold text-white">Cinematic imagery from the journey.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tour.images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_24px_80px_rgba(15,23,42,0.2)]"
            >
              <Image
                src={src}
                alt={`${tour.title} gallery ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
