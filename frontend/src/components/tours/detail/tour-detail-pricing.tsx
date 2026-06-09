'use client'

import { ChevronRight } from 'lucide-react'
import type { Tour } from '@/types/tour'
import { TourInquiryButton } from './tour-inquiry-button'

interface TourDetailPricingProps {
  tour: Tour
}

export function TourDetailPricing({ tour }: TourDetailPricingProps) {
  const message = `Hello Beyond Sea Travels, I would like a precise quote for the ${tour.title} (${tour.durationDays} days, ${tour.country}).`

  return (
    <section className="py-14">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/85 p-4 sm:p-6 lg:p-8 shadow-[0_28px_90px_rgba(15,23,42,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.6fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Pricing</p>
              <h2 className="text-3xl font-semibold text-white">Transparent pricing built for private travel.</h2>
              <p className="text-sm leading-7 text-slate-300">
                Starting from {tour.priceRange}, pricing depends on group size, accommodations and season. Contact us on WhatsApp for a tailored quote.
              </p>
              <p className="text-sm text-slate-400">Note: final rate is confirmed after your guest count and travel preferences are set.</p>
            </div>
            <div className="rounded-[2rem] bg-slate-900/80 p-6 text-center text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
              <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Starting price</p>
              <p className="mt-3 text-4xl font-semibold">${tour.startingPrice.toLocaleString()}</p>
              <TourInquiryButton
                tour={tour}
                message={message}
                source="tour-detail-pricing"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
              >
                Get Exact Quote
                <ChevronRight size={16} />
              </TourInquiryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
