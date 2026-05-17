'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import type { Tour } from '@/types/tour'

interface TourDetailOverviewProps {
  tour: Tour
}

export function TourDetailOverview({ tour }: TourDetailOverviewProps) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="Tour overview"
          title="An immersive journey built for luxury, authenticity and effortless exploration."
          description="This tour blends private transport, curated cultural moments, and calm luxury stays so every day feels beautifully balanced."
          align="left"
        />
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-[0_28px_90px_rgba(15,23,42,0.2)]">
            <p className="text-base leading-8 text-slate-300">{tour.summary}</p>
            <div className="mt-8 space-y-4">
              {tour.highlights.map((highlight) => (
                <div key={highlight} className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
                  <p className="font-semibold text-white">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-[0_28px_90px_rgba(15,23,42,0.2)]">
            <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">What makes it special</p>
            <ul className="space-y-4 text-slate-300">
              <li className="space-y-2 rounded-3xl bg-slate-900/80 p-5">
                <p className="font-semibold text-white">Private luxury at every step</p>
                <p className="text-sm leading-7">From premium arrivals to boutique stays, every detail is curated for your comfort.</p>
              </li>
              <li className="space-y-2 rounded-3xl bg-slate-900/80 p-5">
                <p className="font-semibold text-white">Expert local guides</p>
                <p className="text-sm leading-7">Discover insider stories, heritage sites, and hidden experiences beyond the ordinary route.</p>
              </li>
              <li className="space-y-2 rounded-3xl bg-slate-900/80 p-5">
                <p className="font-semibold text-white">Effortless pace</p>
                <p className="text-sm leading-7">Designed for relaxed luxury travel, with private transfers and time to unwind each day.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
