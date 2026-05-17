'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

export function WhatsAppContact() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Hello Beyond Sea Travels! I would like to plan a trip to Sri Lanka. Can you help me?'
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <section className="border-t border-white/5 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Chat With Our Travel Team
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              Have questions? Our expert team is available 24/7 on WhatsApp. Get instant responses for all your travel inquiries.
            </p>

            <div className="mb-6 flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Instant messaging - typically reply within 15 minutes</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Share photos and videos of your trip plans</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Personal travel assistant assigned to your journey</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600"
            >
              <span className="text-2xl">💬</span>
              Start WhatsApp Chat
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
