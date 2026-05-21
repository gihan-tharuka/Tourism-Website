'use client'

import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'
import type { Tour } from '@/types/tour'

interface TourDetailCTAProps {
  tour: Tour
}

export function TourDetailCTA({ tour }: TourDetailCTAProps) {
  const message = `Hello Beyond Sea Travels, I am interested in the ${tour.title} (${tour.durationDays} days, ${tour.country}). Please send details and availability.`
  const link = getWhatsAppInquiryLink(message)

  return (
    <section className="py-14">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-amber-300/15 bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 p-4 sm:p-6 lg:p-8 shadow-[0_30px_90px_rgba(251,191,36,0.18)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Plan this tour</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Plan this tour with us and feel travel made effortless.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Our team will tailor the journey around your travel style, group size and preferred pace, then confirm availability through WhatsApp.
              </p>
            </div>
            <div className="flex items-center justify-start lg:justify-end">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}