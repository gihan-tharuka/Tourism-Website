import { WHATSAPP_NUMBER, SITE_URL } from '@/lib/constants'

export const getWhatsAppUrl = (message: string): string => {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export const buildInquiryMessage = ({
  tourName,
  travelDate,
  passengers,
  pickupLocation,
  dropoffLocation,
}: {
  tourName?: string
  travelDate?: string
  passengers?: number
  pickupLocation?: string
  dropoffLocation?: string
}) => {
  const lines = [
    'Hello Beyond Sea Travels,',
    '',
    tourName ? `I am interested in the ${tourName}.` : 'I am interested in your tours.',
    travelDate ? `Travel Date: ${travelDate}` : 'Travel Date: (to be confirmed)',
    passengers ? `Passenger Count: ${passengers}` : 'Passenger Count: (to be confirmed)',
    pickupLocation ? `Pickup: ${pickupLocation}` : undefined,
    dropoffLocation ? `Drop-off: ${dropoffLocation}` : undefined,
    '',
    'Please send more details.',
  ]

  return lines.filter(Boolean).join('\n')
}

export const getWhatsAppInquiryLink = (message: string) => {
  return getWhatsAppUrl(`${message}\n\n${SITE_URL}`)
}
