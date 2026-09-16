'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'

export function AboutCTA() {
  const whatsappLink = getWhatsAppInquiryLink(
    'Hello IslandSea Travels, I would like to plan a trip to Sri Lanka.'
  )

  return (
    <section className="border-t border-white/5 bg-gradient-to-r from-amber-900/20 to-blue-900/20 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Start your personalized journey with IslandSea Travels. Let us create an experience you&apos;ll treasure forever.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition-all hover:bg-amber-600"
            >
              Explore Tours
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
