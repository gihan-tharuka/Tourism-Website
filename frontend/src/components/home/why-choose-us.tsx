'use client'

import Link from 'next/link'
import { ArrowRight, Compass, Headset, MapPin, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal, staggerDelay } from '@/components/ui/reveal'

const cards = [
  {
    title: 'Private transport',
    description: 'Premium vehicles with expert drivers for comfortable island travel.',
    icon: MapPin,
  },
  {
    title: 'Experienced guides',
    description: 'Local experts deliver meaningful cultural and wildlife storytelling.',
    icon: Compass,
  },
  {
    title: 'Custom itineraries',
    description: 'Each journey is created around your interests and travel style.',
    icon: Sparkles,
  },
  {
    title: '24/7 support',
    description: 'Dedicated assistance every step of the journey, from arrival to departure.',
    icon: Headset,
  },
]

export function WhyChooseUs() {
  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Why choose us"
              title="Built for discerning travelers who expect thoughtful luxury and seamless planning."
              description="We combine private hospitality, local knowledge and premium logistics for a travel experience that feels effortless and exceptional."
              align="left"
            />
            <Link
              href="/custom-tour"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-[#0b6b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Start planning
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((card, index) => {
              const Icon = card.icon

              return (
                <Reveal key={card.title} delay={staggerDelay(index)} className="h-full">
                  <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-float">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
