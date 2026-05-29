'use client'

import { motion } from 'framer-motion'
import type { Testimonial } from '@/types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-panel rounded-[2rem] border border-white/10 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.3)]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-300/10 text-2xl text-amber-200">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-slate-400">{testimonial.location}</p>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 text-slate-200">“{testimonial.quote}”</p>
      <p className="mt-6 text-sm uppercase tracking-[0.28em] text-amber-200/80">{testimonial.role}</p>
    </motion.article>
  )
}
