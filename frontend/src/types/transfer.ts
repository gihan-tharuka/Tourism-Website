export interface TransferLocation {
  id: string
  name: string
  category: 'airport' | 'city' | 'beach' | 'mountain'
  region: string
}

export interface TransferFormData {
  pickupLocation: string
  dropoffLocation: string
  passengerCount: string
  fullName: string
  whatsappNumber: string
  country: string
  travelDate?: string
}

export interface VehicleType {
  id: string
  name: string
  passengers: string
  description: string
  icon: string
  luggage: string
}

export interface PricingRoute {
  from: string
  to: string
  distance: number
  basePrice: number
  pricePerKm: number
}

export interface RecommendedStop {
  id: string
  name: string
  description: string
  icon: string
  routes: string[] // route IDs this stop applies to
}
