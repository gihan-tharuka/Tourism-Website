'use client'

import { Award, Compass, Headset, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

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
    title: 'Local expertise',
    description: 'Insider access to hidden gems beyond the typical tourist route.',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible travel',
    description: 'Adaptable plans and seamless adjustments for changing preferences.',
    icon: Award,
  },
  {
    title: '24/7 support',
    description: 'Dedicated assistance every step of the journey, from arrival to departure.',
    icon: Headset,
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why choose us"
          title="Built for discerning travelers who expect thoughtful luxury and seamless planning."
          description="We combine private hospitality, local knowledge and premium logistics for a travel experience that feels effortless and exceptional."
          align="left"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass-panel rounded-[2rem] border border-white/10 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.2)]"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-300/10 text-amber-200">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
