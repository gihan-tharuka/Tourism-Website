'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

const contactInfoItems = [
  {
    title: 'WhatsApp',
    value: '+94 76 123 4567',
    description: 'Chat with us for instant replies',
  },
  {
    title: 'Email',
    value: 'hello@beyondseatravels.com',
    description: 'For detailed inquiries',
  },
  {
    title: 'Availability',
    value: '24/7',
    description: 'Typically reply within 15 mins',
  },
  {
    title: 'Service Area',
    value: 'All of Sri Lanka',
    description: 'From Colombo to the southern coast',
  },
]

export function ContactInfo() {
  return (
    <section className="border-t border-white/5 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Get In Touch
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Contact Information</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
              <p className="mb-2 font-bold text-amber-300">{item.value}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
