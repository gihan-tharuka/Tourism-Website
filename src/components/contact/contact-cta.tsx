'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container } from '@/components/ui/container'

export function ContactCTA() {
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
            Your Sri Lankan Adventure Starts Here
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Whether you're ready to book or just exploring options, our team is excited to help plan your perfect journey.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition-all hover:bg-amber-600"
            >
              Explore Tours
            </Link>
            <a
              href="https://wa.me/?text=Hello%20Beyond%20Sea%20Travels%2C%20I%20would%20like%20to%20plan%20a%20trip%20to%20Sri%20Lanka"
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