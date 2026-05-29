import { ContactHero } from '@/components/contact/contact-hero'
import { ContactInfo } from '@/components/contact/contact-info'
import { InquiryForm } from '@/components/contact/inquiry-form'
import { WhatsAppContact } from '@/components/contact/whatsapp-contact'
import { ServiceMap } from '@/components/contact/service-map'
import { TravelerSupport } from '@/components/contact/traveler-support'
import { ContactFAQ } from '@/components/contact/contact-faq'
import { ContactCTA } from '@/components/contact/contact-cta'
import type { Metadata } from 'next'
import { createFaqJsonLd, createPageMetadata, JsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Beyond Sea Travels | Sri Lanka Travel Experts',
  description:
    'Contact Beyond Sea Travels for personalized Sri Lanka tours, private transfers, and custom travel experiences. Get instant WhatsApp support 24/7.',
  keywords: [
    'contact',
    'Sri Lanka travel',
    'inquiry',
    'booking',
    'WhatsApp support',
    'travel assistant',
  ],
  pathname: '/contact',
  image: '/images/cinematic.webp',
})

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={createFaqJsonLd(contactFaqItems)} />
      <ContactHero />
      <ContactInfo />
      <InquiryForm />
      <WhatsAppContact />
      <ServiceMap />
      <TravelerSupport />
      <ContactFAQ />
      <ContactCTA />
    </main>
  )
}

const contactFaqItems = [
  {
    question: 'How quickly will you respond to my inquiry?',
    answer:
      'We typically respond to WhatsApp inquiries within 15 minutes during business hours. For emails, expect a response within 2-4 hours. We are available 24/7 to support your travel plans.',
  },
  {
    question: 'What is your booking process?',
    answer:
      'Contact us via WhatsApp or email with your travel dates, interests, and budget. We create a customized proposal with pricing, then secure bookings and logistics after confirmation.',
  },
  {
    question: 'Can you arrange custom tours?',
    answer:
      'Yes. We create itineraries based on your interests, budget, travel dates, and group size.',
  },
  {
    question: 'Do you offer airport pickup services?',
    answer:
      'Yes. We arrange airport pickup and private transport from Bandaranaike International Airport to destinations across Sri Lanka.',
  },
]
