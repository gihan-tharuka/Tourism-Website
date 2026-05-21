'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { LocationSelector } from './location-selector'
import { PassengerSelector } from './passenger-selector'
import { VehicleCard } from './vehicle-card'
import { PricingSummary } from './pricing-summary'
import { RecommendedStops } from './recommended-stops'
import {
  calculateTransferPrice,
  getRecommendedVehicle,
  getRecommendedStopsForRoute,
  getLocationName,
  buildTransferMessage,
} from '@/services/transfer.service'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'
import { transferLocations, passengerOptions } from '@/data/transfers'
import type { TransferFormData } from '@/types/transfer'

export function TransferForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<TransferFormData>({
    pickupLocation: '',
    dropoffLocation: '',
    passengerCount: '1-2',
    fullName: '',
    whatsappNumber: '',
    country: '',
    travelDate: undefined,
  })

  const canSubmit =
    formData.pickupLocation &&
    formData.dropoffLocation &&
    formData.pickupLocation !== formData.dropoffLocation &&
    formData.passengerCount &&
    formData.fullName.trim() &&
    formData.whatsappNumber.trim() &&
    formData.country.trim()

  const estimatedPrice = calculateTransferPrice(
    formData.pickupLocation,
    formData.dropoffLocation,
    formData.passengerCount
  )

  const recommendedVehicle = getRecommendedVehicle(formData.passengerCount)

  const recommendedStops =
    formData.pickupLocation && formData.dropoffLocation
      ? getRecommendedStopsForRoute(formData.pickupLocation, formData.dropoffLocation)
      : []

  const handleSubmitWhatsApp = async () => {
    setIsSubmitting(true)
    try {
      const message = buildTransferMessage(formData)
      const whatsappLink = getWhatsAppInquiryLink(message)
      window.open(whatsappLink, '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Book Your Transfer</h2>

              <div className="space-y-4">
                {/* Locations */}
                <div className="grid gap-4 md:grid-cols-2">
                  <LocationSelector
                    label="Pickup Location"
                    locations={transferLocations}
                    value={formData.pickupLocation}
                    onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
                    disabledValue={formData.dropoffLocation}
                  />

                  <LocationSelector
                    label="Drop-off Location"
                    locations={transferLocations}
                    value={formData.dropoffLocation}
                    onChange={(value) => setFormData({ ...formData, dropoffLocation: value })}
                    disabledValue={formData.pickupLocation}
                  />
                </div>

                {/* Passenger Count */}
                <PassengerSelector
                  options={passengerOptions}
                  value={formData.passengerCount}
                  onChange={(value) => setFormData({ ...formData, passengerCount: value })}
                />

                {/* Travel Date */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-semibold text-white">Preferred Travel Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.travelDate || ''}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>

              <div className="space-y-4">
                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />

                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />

                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  type="tel"
                  placeholder="WhatsApp Number (e.g., +1234567890)"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <Button
                onClick={handleSubmitWhatsApp}
                disabled={!canSubmit || isSubmitting}
                className="mt-6 w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Book Transfer on WhatsApp'}
              </Button>
            </motion.div>

            {/* Recommended Stops */}
            {recommendedStops.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <RecommendedStops stops={recommendedStops} />
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="sticky top-4 space-y-4">
              {/* Vehicle Card */}
              <VehicleCard vehicle={recommendedVehicle} />

              {/* Pricing Summary */}
              {formData.pickupLocation && formData.dropoffLocation && (
                <PricingSummary
                  pickupName={getLocationName(formData.pickupLocation)}
                  dropoffName={getLocationName(formData.dropoffLocation)}
                  estimatedPrice={estimatedPrice}
                  vehicleName={recommendedVehicle?.name}
                  passengerCount={formData.passengerCount}
                />
              )}

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-blue-400/30 bg-blue-400/10 p-4 text-sm text-gray-300"
              >
                <p className="mb-2 font-semibold text-blue-300">About Our Service</p>
                <ul className="space-y-1 text-xs">
                  <li>✓ Professional & experienced drivers</li>
                  <li>✓ All vehicles air-conditioned</li>
                  <li>✓ Flexible scheduling & stops</li>
                  <li>✓ Airport pickup specialists</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}