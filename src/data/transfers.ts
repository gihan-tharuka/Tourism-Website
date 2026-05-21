import type { TransferLocation, VehicleType, PricingRoute, RecommendedStop } from '@/types/transfer'

export const transferLocations: TransferLocation[] = [
  {
    id: 'colombo',
    name: 'Colombo',
    category: 'city',
    region: 'Western Province',
  },
  {
    id: 'airport',
    name: 'Bandaranaike International Airport',
    category: 'airport',
    region: 'Western Province',
  },
  {
    id: 'galle',
    name: 'Galle',
    category: 'beach',
    region: 'Southern Province',
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    category: 'beach',
    region: 'Southern Province',
  },
  {
    id: 'ella',
    name: 'Ella',
    category: 'mountain',
    region: 'Central Province',
  },
  {
    id: 'kandy',
    name: 'Kandy',
    category: 'city',
    region: 'Central Province',
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    category: 'mountain',
    region: 'Central Province',
  },
  {
    id: 'yala',
    name: 'Yala',
    category: 'city',
    region: 'Southern Province',
  },
]

export const vehicleTypes: VehicleType[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    passengers: '1–2',
    description: 'Comfortable sedan for solo travelers or couples',
    icon: '',
    luggage: 'Up to 2 large suitcases',
  },
  {
    id: 'suv',
    name: 'SUV',
    passengers: '3–5',
    description: 'Spacious SUV for small groups',
    icon: '',
    luggage: 'Up to 4 large suitcases',
  },
  {
    id: 'van',
    name: 'Van',
    passengers: '6–9',
    description: 'Comfortable van for medium groups',
    icon: '',
    luggage: 'Up to 8 large suitcases',
  },
  {
    id: 'mini-coach',
    name: 'Mini Coach',
    passengers: '10–14',
    description: 'Luxury mini coach for larger groups',
    icon: '',
    luggage: 'Up to 14 large suitcases + storage',
  },
  {
    id: 'large-coach',
    name: 'Large Coach',
    passengers: '15+',
    description: 'Full-size coach for large groups',
    icon: '',
    luggage: 'Unlimited luggage storage',
  },
]

// Simple pricing matrix: from -> to -> price
export const pricingRoutes: PricingRoute[] = [
  // From Colombo
  { from: 'colombo', to: 'airport', distance: 25, basePrice: 45, pricePerKm: 4 },
  { from: 'colombo', to: 'galle', distance: 120, basePrice: 180, pricePerKm: 2 },
  { from: 'colombo', to: 'mirissa', distance: 160, basePrice: 220, pricePerKm: 2 },
  { from: 'colombo', to: 'ella', distance: 220, basePrice: 320, pricePerKm: 1.8 },
  { from: 'colombo', to: 'kandy', distance: 115, basePrice: 170, pricePerKm: 2 },
  { from: 'colombo', to: 'sigiriya', distance: 165, basePrice: 240, pricePerKm: 1.8 },
  { from: 'colombo', to: 'yala', distance: 280, basePrice: 380, pricePerKm: 1.5 },

  // From Airport
  { from: 'airport', to: 'colombo', distance: 25, basePrice: 45, pricePerKm: 4 },
  { from: 'airport', to: 'galle', distance: 140, basePrice: 200, pricePerKm: 2 },
  { from: 'airport', to: 'mirissa', distance: 180, basePrice: 240, pricePerKm: 2 },
  { from: 'airport', to: 'ella', distance: 240, basePrice: 340, pricePerKm: 1.8 },
  { from: 'airport', to: 'kandy', distance: 135, basePrice: 190, pricePerKm: 2 },
  { from: 'airport', to: 'sigiriya', distance: 185, basePrice: 260, pricePerKm: 1.8 },
  { from: 'airport', to: 'yala', distance: 300, basePrice: 400, pricePerKm: 1.5 },

  // From Galle
  { from: 'galle', to: 'colombo', distance: 120, basePrice: 180, pricePerKm: 2 },
  { from: 'galle', to: 'mirissa', distance: 50, basePrice: 90, pricePerKm: 2.5 },
  { from: 'galle', to: 'ella', distance: 200, basePrice: 280, pricePerKm: 1.8 },
  { from: 'galle', to: 'kandy', distance: 220, basePrice: 300, pricePerKm: 1.8 },
  { from: 'galle', to: 'airport', distance: 140, basePrice: 200, pricePerKm: 2 },

  // From Mirissa
  { from: 'mirissa', to: 'colombo', distance: 160, basePrice: 220, pricePerKm: 2 },
  { from: 'mirissa', to: 'galle', distance: 50, basePrice: 90, pricePerKm: 2.5 },
  { from: 'mirissa', to: 'ella', distance: 240, basePrice: 320, pricePerKm: 1.8 },
  { from: 'mirissa', to: 'kandy', distance: 260, basePrice: 340, pricePerKm: 1.8 },
  { from: 'mirissa', to: 'airport', distance: 180, basePrice: 240, pricePerKm: 2 },

  // From Ella
  { from: 'ella', to: 'colombo', distance: 220, basePrice: 320, pricePerKm: 1.8 },
  { from: 'ella', to: 'kandy', distance: 85, basePrice: 140, pricePerKm: 2.5 },
  { from: 'ella', to: 'sigiriya', distance: 120, basePrice: 180, pricePerKm: 2 },
  { from: 'ella', to: 'airport', distance: 240, basePrice: 340, pricePerKm: 1.8 },

  // From Kandy
  { from: 'kandy', to: 'colombo', distance: 115, basePrice: 170, pricePerKm: 2 },
  { from: 'kandy', to: 'ella', distance: 85, basePrice: 140, pricePerKm: 2.5 },
  { from: 'kandy', to: 'sigiriya', distance: 70, basePrice: 120, pricePerKm: 2.5 },
  { from: 'kandy', to: 'airport', distance: 135, basePrice: 190, pricePerKm: 2 },

  // From Sigiriya
  { from: 'sigiriya', to: 'colombo', distance: 165, basePrice: 240, pricePerKm: 1.8 },
  { from: 'sigiriya', to: 'kandy', distance: 70, basePrice: 120, pricePerKm: 2 },
  { from: 'sigiriya', to: 'ella', distance: 120, basePrice: 180, pricePerKm: 2 },
  { from: 'sigiriya', to: 'airport', distance: 185, basePrice: 260, pricePerKm: 1.8 },

  // From Yala
  { from: 'yala', to: 'colombo', distance: 280, basePrice: 380, pricePerKm: 1.5 },
  { from: 'yala', to: 'mirissa', distance: 120, basePrice: 180, pricePerKm: 2 },
  { from: 'yala', to: 'galle', distance: 170, basePrice: 240, pricePerKm: 2 },
  { from: 'yala', to: 'airport', distance: 300, basePrice: 400, pricePerKm: 1.5 },
]

export const recommendedStops: RecommendedStop[] = [
  {
    id: 'turtle-hatchery',
    name: 'Bentota Turtle Hatchery',
    description: 'Visit the sea turtle conservation center',
    icon: '',
    routes: ['colombo-galle', 'airport-galle', 'colombo-mirissa', 'airport-mirissa'],
  },
  {
    id: 'madu-safari',
    name: 'Madu River Safari',
    description: 'Scenic boat tour through mangrove forests',
    icon: '',
    routes: ['colombo-galle', 'airport-galle', 'colombo-mirissa', 'airport-mirissa'],
  },
  {
    id: 'tea-plantation',
    name: 'Tea Plantation Tours',
    description: 'Visit working tea estates in the highlands',
    icon: '',
    routes: ['colombo-ella', 'airport-ella', 'colombo-kandy', 'airport-kandy'],
  },
  {
    id: 'waterfall',
    name: 'Ella Waterfall',
    description: 'Scenic waterfall hike with panoramic views',
    icon: '',
    routes: ['colombo-ella', 'airport-ella', 'kandy-ella'],
  },
  {
    id: 'sigiriya-rock',
    name: 'Sigiriya Rock Fortress',
    description: 'Climb the ancient rock fortress',
    icon: '',
    routes: ['colombo-sigiriya', 'airport-sigiriya', 'kandy-sigiriya'],
  },
  {
    id: 'safari-yala',
    name: 'Yala Safari',
    description: 'Wildlife watching in Yala National Park',
    icon: '',
    routes: ['colombo-yala', 'airport-yala', 'mirissa-yala'],
  },
]

export const passengerOptions = [
  { label: '1–2 people', value: '1-2' },
  { label: '3–5 people', value: '3-5' },
  { label: '6–9 people', value: '6-9' },
  { label: '10–14 people', value: '10-14' },
  { label: '15+ people', value: '15+' },
]