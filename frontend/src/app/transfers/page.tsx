import { TransferHero } from '@/components/transfers/transfer-hero'
import { TransferForm } from '@/components/transfers/transfer-form'
import { Container } from '@/components/ui/container'
import type { Metadata } from 'next'
import { createFaqJsonLd, createPageMetadata, JsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Private Sri Lanka Transfers | Beyond Sea Travels',
  description:
    'Book reliable private transfers across Sri Lanka with premium vehicles and personalized travel experiences. Instant WhatsApp quotes and 24/7 customer support.',
  keywords: ['transfers', 'private transport', 'Sri Lanka', 'airport pickups', 'luxury transport'],
  pathname: '/transfers',
  image: '/images/Galle-Fort2.jpg',
})

export default function TransfersPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={createFaqJsonLd(faqItems)} />
      <TransferHero />
      <section id="transfer-booking" className="scroll-mt-24">
        <TransferForm />
      </section>

      {/* Trust Section */}
      <section className="border-t border-white/5 py-12 md:py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Why Choose Beyond Sea Travels?</h2>
            <p className="text-gray-400">Experience premium transportation with a trusted team</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/8"
              >
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-white/5 py-12 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/8"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-white">
                    {item.question}
                    <svg
                      className="h-5 w-5 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/5 bg-gradient-to-r from-amber-900/20 to-blue-900/20 py-12 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready for Your Journey?</h2>
            <p className="mb-8 text-gray-300">
              Get instant transfer quotes and book directly through WhatsApp. Our team is available 24/7 to assist you.
            </p>
            <a
              href="#transfer-booking"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition-all hover:bg-amber-600"
            >
              Book Your Transfer
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}

const trustItems = [
  {
    title: 'Professional Drivers',
    description: 'Experienced, courteous drivers who know Sri Lanka inside out.',
  },
  {
    title: 'Comfort First',
    description: 'All vehicles are modern, air-conditioned, and well-maintained.',
  },
  {
    title: 'Flexible Stops',
    description: 'Stop at attractions, restaurants, or shops along the way.',
  },
  {
    title: 'Airport Specialists',
    description: 'Seamless airport pickups and drop-offs on time, every time.',
  },
  {
    title: '24/7 Support',
    description: 'WhatsApp support available round-the-clock for your needs.',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden charges. What you see is what you pay.',
  },
]

const faqItems = [
  {
    question: 'Can you arrange airport pickups?',
    answer:
      'Absolutely! We specialize in airport pickups. We track your flight and adjust to delays. Drivers meet you at the arrivals hall with a name board.',
  },
  {
    question: 'How much luggage can I bring?',
    answer:
      'Luggage capacity depends on the vehicle type. Sedans fit up to 2 large suitcases, SUVs up to 4, and vans up to 8. Our team will confirm details when you book.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods: cash, bank transfer, credit/debit cards. You can arrange payment details directly via WhatsApp after receiving your quote.',
  },
  {
    question: 'Can I stop at attractions along the way?',
    answer:
      'Yes! We love helping travelers explore. You can add stops at tea plantations, waterfalls, temples, or restaurants. Just mention it when you book.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer: "Cancellations are flexible. If you cancel 24 hours before, there's no charge. For late cancellations, we charge a small fee. Rescheduling is usually free.",
  },
  {
    question: 'Are child seats available for infants?',
    answer:
      'Yes, we can provide child seats for infants upon request. Please let us know in advance so we can prepare everything for your family.',
  },
]
