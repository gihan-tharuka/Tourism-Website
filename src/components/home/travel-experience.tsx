'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

const sections = [
  {
    title: 'Travel that feels cinematic every step of the way.',
    description:
      'Enjoy a luxury rhythm of travel that blends elegant stays, private drives, and soulful cultural encounters curated by local experts.',
    image:
      'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=80',
    reverse: false,
  },
  {
    title: 'Moments designed for meaningful discovery.',
    description:
      'From sunrise temples to seaside restaurants, our journeys are shaped around stories that elevate each destination into a memorable escape.',
    image:
      'https://images.unsplash.com/photo-1517821365206-3c8d0adebb1a?auto=format&fit=crop&w=1200&q=80',
    reverse: true,
  },
]

export function TravelExperience() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Travel experience"
          title="A refined journey that looks beautiful and feels perfectly balanced."
          description="We craft every detail so the most important part of travel is what you experience, not what you manage."
          align="left"
        />

        <div className="mt-16 space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className={`grid gap-8 lg:items-center lg:grid-cols-[0.95fr_1.05fr] ${section.reverse ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
                <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Journey highlights</p>
                <h3 className="text-3xl font-semibold leading-tight text-white">{section.title}</h3>
                <p className="max-w-2xl text-base leading-8 text-slate-300">{section.description}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-300">
                    <p className="font-semibold text-white">Tailored access</p>
                    <p className="mt-2 leading-7">Private experiences, skip-the-line arrivals and intimate moments with local experts.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-300">
                    <p className="font-semibold text-white">Seamless luxury</p>
                    <p className="mt-2 leading-7">Relaxed pacing, premium transfers and service that feels effortless from beginning to end.</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 shadow-[0_30px_90px_rgba(15,23,42,0.3)]">
                <div className="relative h-96 sm:h-[420px]">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
