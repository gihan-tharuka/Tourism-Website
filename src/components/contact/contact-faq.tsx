'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'

const faqItems = [
  {
    question: 'How quickly will you respond to my inquiry?',
    answer:
      'We typically respond to WhatsApp inquiries within 15 minutes during business hours. For emails, expect a response within 2-4 hours. We&apos;re available 24/7 to support your travel plans.',
  },
  {
    question: 'What is your booking process?',
    answer:
      'Simply contact us via WhatsApp or email with your travel dates, interests, and budget. We&apos;ll create a customized proposal with pricing. Once you confirm, we secure your bookings and handle all logistics.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers, credit/debit cards, PayPal, and other online payment methods. Payment can be made after you receive your quote, and we&apos;re flexible with payment schedules.',
  },
  {
    question: 'Can you arrange custom tours?',
    answer:
      'Absolutely! Custom tours are our specialty. We can create itineraries based on your specific interests, budget, travel dates, and group size. Use our custom tour builder or contact us directly.',
  },
  {
    question: 'Do you offer airport pickup services?',
    answer:
      'Yes, we specialize in airport pickups. We can arrange transportation from Bandaranaike International Airport to your hotel or any destination in Sri Lanka with professional drivers and air-conditioned vehicles.',
  },
  {
    question: 'Can I get travel recommendations?',
    answer:
      'Of course! Our team loves sharing local insights. Whether you need restaurant recommendations, hidden gem locations, or cultural tips, we&apos;re here to help you discover the best of Sri Lanka.',
  },
]

export function ContactFAQ() {
  return (
    <section className="border-t border-white/5 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Questions
            </span>
            <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/8"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white">
                  {item.question}
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </summary>
                <div className="border-t border-white/10 px-6 pb-6 pt-4 text-gray-300">
                  {item.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
