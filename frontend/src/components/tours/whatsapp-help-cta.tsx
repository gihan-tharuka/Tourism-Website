'use client'

import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'

const message = 'Hello Beyond Sea Travels, I need help choosing the best tour package for my dates and group size.'

export function WhatsAppHelpCTA() {
  const link = getWhatsAppInquiryLink(message)

  return (
    <section className="sticky bottom-0 left-0 z-40 w-full border-t border-white/10 bg-slate-950/95 py-4 backdrop-blur-xl sm:relative sm:border-none sm:bg-transparent">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm uppercase tracking-[0.36em] text-amber-200/80">Need help choosing a tour?</p>
          <p className="mt-2 text-base font-semibold text-white">Chat with our travel team on WhatsApp for personalized recommendations.</p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200"
        >
          Contact on WhatsApp
        </a>
      </div>
    </section>
  )
}
