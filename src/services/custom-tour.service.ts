import type { CustomTourFormData, ItineraryDay } from '@/types/custom-tour'
import { destinations } from '@/data/destinations'

/**
 * Generate a suggested itinerary based on selected destinations and duration
 */
export const generateItinerary = (
  destinationIds: string[],
  durationDays: number
): ItineraryDay[] => {
  if (destinationIds.length === 0 || durationDays < 1) {
    return []
  }

  const selectedDestinations = destinations.filter((d) => destinationIds.includes(d.id))

  // Simple itinerary generation logic:
  // Distribute selected destinations across available days
  // Add day for arrival/departure
  const itinerary: ItineraryDay[] = []

  let currentDay = 1
  let destinationIndex = 0

  while (currentDay <= durationDays && destinationIndex < selectedDestinations.length) {
    const destination = selectedDestinations[destinationIndex]

    // Activities by destination
    const activities = getActivitiesByDestination(destination.id)

    itinerary.push({
      day: currentDay,
      destination: destination.name,
      activities: activities.slice(0, 3),
    })

    destinationIndex++
    currentDay++
  }

  return itinerary
}

/**
 * Get suggested activities for a destination
 */
export const getActivitiesByDestination = (destinationId: string): string[] => {
  const activitiesMap: Record<string, string[]> = {
    sigiriya: ['Climb Sigiriya Rock', 'Ancient temple exploration', 'Jungle wildlife watching'],
    ella: ['Nine Arch Bridge hike', 'Tea plantation visit', 'Waterfall trekking'],
    mirissa: ['Sunset beach walk', 'Whale watching tour', 'Private yacht experience'],
    kandy: ['Temple of the Tooth visit', 'Cultural dance show', 'Lakeside evening stroll'],
    galle: ['Fort exploration', 'Artisan market shopping', 'Sunset at ramparts'],
    'nuwara-eliya': ['Gregory Lake hike', 'Botanical gardens', 'Golf at mountain course'],
    yala: ['Safari jeep tour', 'Wildlife photography', 'Jungle camp experience'],
  }

  return activitiesMap[destinationId] || ['Guided tour', 'Local dining', 'Cultural experience']
}

/**
 * Build a comprehensive WhatsApp inquiry message
 */
export const buildCustomTourMessage = (formData: CustomTourFormData): string => {
  const selectedDestinations = destinations
    .filter((d) => formData.destinations.includes(d.id))
    .map((d) => d.name)
    .join(', ')

  const budgetLabels: Record<string, string> = {
    budget: '$80–$200 per day',
    standard: '$200–$500 per day',
    luxury: '$500+ per day',
  }

  const interestLabels: Record<string, string> = {
    beaches: 'Beaches',
    wildlife: 'Wildlife',
    adventure: 'Adventure',
    culture: 'Culture',
    food: 'Food',
    hiking: 'Hiking',
    relaxation: 'Luxury Relaxation',
  }

  const passengerLabels: Record<string, string> = {
    '1-2': '1–2 people',
    '3-5': '3–5 people',
    '6-9': '6–9 people',
    '10+': '10+ people',
  }

  const lines = [
    '🌴 *Custom Tour Inquiry* 🌴',
    '',
    `Hello Beyond Sea Travels!`,
    '',
    `I would like to create a custom tour. Here are my preferences:`,
    '',
    `*Destinations:* ${selectedDestinations}`,
    `*Duration:* ${formData.duration === 'custom' ? 'Custom duration' : `${formData.duration} days`}`,
    `*Budget:* ${budgetLabels[formData.budget]}`,
    `*Travel Interests:* ${formData.interests.map((i) => interestLabels[i] || i).join(', ')}`,
    `*Passenger Count:* ${passengerLabels[formData.passengerCount] || formData.passengerCount}`,
    `*Full Name:* ${formData.fullName}`,
    `*Country:* ${formData.country}`,
    `*WhatsApp:* ${formData.whatsappNumber}`,
    formData.travelDate ? `*Preferred Travel Date:* ${formData.travelDate}` : undefined,
    '',
    'Please share available options and pricing for this custom itinerary.',
  ]

  return lines.filter(Boolean).join('\n')
}
