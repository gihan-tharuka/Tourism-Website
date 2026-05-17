import type { TransferFormData, VehicleType } from '@/types/transfer'
import { pricingRoutes, vehicleTypes, transferLocations, recommendedStops } from '@/data/transfers'

/**
 * Calculate estimated price for a transfer route
 */
export const calculateTransferPrice = (
  fromLocationId: string,
  toLocationId: string,
  passengerCount: string
): number => {
  // Find the pricing route
  const route = pricingRoutes.find((r) => r.from === fromLocationId && r.to === toLocationId)

  if (!route) {
    // Default price if route not found
    return 150
  }

  const basePrice = route.basePrice

  // Apply passenger count multiplier
  const passengerMultipliers: Record<string, number> = {
    '1-2': 1.0,
    '3-5': 1.15,
    '6-9': 1.3,
    '10-14': 1.4,
    '15+': 1.5,
  }

  const multiplier = passengerMultipliers[passengerCount] || 1.0
  return Math.round(basePrice * multiplier)
}

/**
 * Get recommended vehicle based on passenger count
 */
export const getRecommendedVehicle = (passengerCount: string): VehicleType | null => {
  const vehicleMap: Record<string, string> = {
    '1-2': 'sedan',
    '3-5': 'suv',
    '6-9': 'van',
    '10-14': 'mini-coach',
    '15+': 'large-coach',
  }

  const vehicleId = vehicleMap[passengerCount]
  return vehicleTypes.find((v) => v.id === vehicleId) || null
}

/**
 * Get recommended stops for a specific route
 */
export const getRecommendedStopsForRoute = (
  fromLocationId: string,
  toLocationId: string
): typeof recommendedStops => {
  const routeKey = `${fromLocationId}-${toLocationId}`

  return recommendedStops.filter((stop) => stop.routes.includes(routeKey))
}

/**
 * Get location name by ID
 */
export const getLocationName = (locationId: string): string => {
  return transferLocations.find((l) => l.id === locationId)?.name || locationId
}

/**
 * Build WhatsApp transfer inquiry message
 */
export const buildTransferMessage = (formData: TransferFormData): string => {
  const pickupLocation = getLocationName(formData.pickupLocation)
  const dropoffLocation = getLocationName(formData.dropoffLocation)
  const estimatedPrice = calculateTransferPrice(
    formData.pickupLocation,
    formData.dropoffLocation,
    formData.passengerCount
  )
  const vehicle = getRecommendedVehicle(formData.passengerCount)

  const passengerLabels: Record<string, string> = {
    '1-2': '1–2 people',
    '3-5': '3–5 people',
    '6-9': '6–9 people',
    '10-14': '10–14 people',
    '15+': '15+ people',
  }

  const lines = [
    '🚗 *Transfer Booking Inquiry* 🚗',
    '',
    'Hello Beyond Sea Travels!',
    '',
    'I would like to book a private transfer. Here are my details:',
    '',
    `*Pickup Location:* ${pickupLocation}`,
    `*Drop-off Location:* ${dropoffLocation}`,
    `*Passenger Count:* ${passengerLabels[formData.passengerCount] || formData.passengerCount}`,
    `*Full Name:* ${formData.fullName}`,
    `*Country:* ${formData.country}`,
    `*WhatsApp:* ${formData.whatsappNumber}`,
    formData.travelDate ? `*Preferred Travel Date:* ${formData.travelDate}` : undefined,
    '',
    `*Estimated Vehicle:* ${vehicle?.name || 'To be confirmed'}`,
    `*Estimated Price:* $${estimatedPrice}`,
    '',
    'Please provide available options and confirm the pricing.',
  ]

  return lines.filter(Boolean).join('\n')
}
