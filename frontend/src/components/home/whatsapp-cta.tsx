'use client'

import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'
import { motion } from 'framer-motion'

export function WhatsAppCTA() {
  const message = 'Hello Beyond Sea Travels, I am interested in planning a custom luxury itinerary. Please share more details.'
  const link = getWhatsAppInquiryLink(message)

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-16 px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[3rem] border border-white/10 bg-slate-950/90 px-8 py-10 shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:flex-row">
        <div className="max-w-2xl space-y-4 text-center sm:text-left">
          <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Ready to connect?</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Start your travel inquiry instantly on WhatsApp.
          </h2>
          <p className="text-sm leading-7 text-slate-300">
            Our team is available around the clock to design your private itinerary and answer all planning questions.
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
        >
          Chat on WhatsApp
        </a>
      </div>
    </motion.section>
  )
}
