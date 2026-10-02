'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const sections = [
  {
    title: 'Travel that feels cinematic every step of the way.',
    description:
      'Enjoy a luxury rhythm of travel that blends elegant stays, private drives, and soulful cultural encounters curated by local experts.',
    image: '/images/cinematic.webp',
    reverse: false,
    points: [
      'Private drivers and premium vehicles throughout',
      'Handpicked stays with elevated comfort',
      'Pacing shaped entirely around you',
    ],
  },
  {
    title: 'Moments designed for meaningful discovery.',
    description:
      'From sunrise temples to seaside restaurants, our journeys are shaped around stories that elevate each destination into a memorable escape.',
    image: '/images/meaningful.webp',
    reverse: true,
    points: [
      'Sunrise temple visits before the crowds',
      'Seaside dining with local chefs',
      'Stories shared by expert local guides',
    ],
  },
]

export function TravelExperience() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Travel experience"
          title="A refined journey that looks beautiful and feels perfectly balanced."
          description="We craft every detail so the most important part of travel is what you experience, not what you manage."
          align="left"
        />

        <div className="mt-16 space-y-20">
          {sections.map((section, index) => (
            <Reveal
              key={section.title}
              delay={index * 0.08}
              className="grid gap-10 lg:grid-cols-2 lg:items-center"
            >
              <div className={cn('space-y-6', section.reverse && 'lg:order-2')}>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                  Journey highlights
                </p>
                <h3 className="font-display text-3xl font-semibold leading-tight text-foreground text-balance">
                  {section.title}
                </h3>
                <p className="text-base leading-8 text-muted-foreground">{section.description}</p>
                <ul className="space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={13} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={cn(
                  'relative overflow-hidden rounded-[2rem] shadow-soft',
                  section.reverse && 'lg:order-1',
                )}
              >
                <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
