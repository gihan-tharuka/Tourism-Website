'use client'

import { ReactNode, useState } from 'react'
import { trackInquiryCreated, trackWhatsAppClick } from '@/lib/analytics'
import { createTourInquiry } from '@/services/inquiry.service'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'
import type { Tour } from '@/types/tour'

interface TourInquiryButtonProps {
  tour: Tour
  message: string
  className: string
  source: string
  children: ReactNode
}

const getPassengerCount = (value: string | null) => {
  const count = Number(value)
  return Number.isFinite(count) && count > 0 ? Math.round(count) : 1
}

export function TourInquiryButton({
  tour,
  message,
  className,
  source,
  children,
}: TourInquiryButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = async () => {
    if (isSubmitting) {
      return
    }

    const fullName = window.prompt('Full name')
    if (!fullName?.trim()) {
      return
    }

    const whatsapp = window.prompt('WhatsApp number')
    if (!whatsapp?.trim()) {
      return
    }

    const email = window.prompt('Email address (optional)') || undefined
    const country = window.prompt('Country (optional)') || undefined
    const travelDate = window.prompt('Preferred travel date YYYY-MM-DD (optional)') || undefined
    const passengerCount = getPassengerCount(window.prompt('Passenger count', '2'))

    setIsSubmitting(true)

    try {
      await createTourInquiry({
        fullName,
        email,
        whatsapp,
        country,
        travelDate,
        passengerCount,
        tourSlug: tour.slug,
        tourTitle: tour.title,
        message,
      })

      trackInquiryCreated('tour')
      window.open(getWhatsAppInquiryLink(message), '_blank')
      trackWhatsAppClick(source)
    } catch {
      window.alert('Unable to save inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={isSubmitting} className={className}>
      {isSubmitting ? 'Saving Inquiry...' : children}
    </button>
  )
}
