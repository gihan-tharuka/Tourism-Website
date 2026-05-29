'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { Container } from '@/components/ui/container'

export function ToursHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-slate-950/95 py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.15),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.1),_transparent_22%)]" />
      <Container>
        <div className="relative max-w-4xl">
          <SectionHeading
            eyebrow="Our tours"
            title="Explore Our Tour Packages"
            description="Discover Sri Lanka, Thailand, and Malaysia through curated travel experiences built for modern luxury travelers."
            align="left"
          />
        </div>
      </Container>
    </section>
  )
}
