'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import type { Testimonial } from '@/types/testimonial'

interface TestimonialsPreviewProps {
  testimonials: Testimonial[]
}

export function TestimonialsPreview({ testimonials }: TestimonialsPreviewProps) {
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
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Guest Stories
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">What Our Travelers Say</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/10 bg-white/5 p-8"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-lg text-amber-300">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-gray-300">&quot;{testimonial.quote}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar || ''}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
