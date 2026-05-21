'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { DestinationSelector } from './destination-selector'
import { DurationSelector } from './duration-selector'
import { BudgetSelector } from './budget-selector'
import { InterestsSelector } from './interests-selector'
import { PassengerSelector } from './passenger-selector'
import { ItineraryPreview } from './itinerary-preview'
import {
  generateItinerary,
  buildCustomTourMessage,
} from '@/services/custom-tour.service'
import { getWhatsAppInquiryLink } from '@/services/whatsapp.service'
import { budgetOptions, interestOptions, passengerOptions } from '@/data/custom-tour'
import type { CustomTourFormData, ItineraryDay } from '@/types/custom-tour'
import type { Destination } from '@/types/destination'

interface CustomTourFormProps {
  destinations: Destination[]
}

type FormStep = 'destinations' | 'duration' | 'budget' | 'interests' | 'passengers' | 'contact' | 'review'

const stepTitles: Record<FormStep, string> = {
  destinations: 'Destinations',
  duration: 'Duration',
  budget: 'Budget',
  interests: 'Interests',
  passengers: 'Passengers',
  contact: 'Contact Info',
  review: 'Review & Submit',
}

const steps: FormStep[] = ['destinations', 'duration', 'budget', 'interests', 'passengers', 'contact', 'review']

export function CustomTourForm({ destinations }: CustomTourFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>('destinations')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState<CustomTourFormData>({
    destinations: [],
    duration: 7,
    budget: 'standard',
    interests: [],
    passengerCount: '1-2',
    fullName: '',
    country: '',
    whatsappNumber: '',
    travelDate: undefined,
  })

  // Generate itinerary based on selections
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])

  const handleDestinationsChange = (ids: string[]) => {
    const updated = { ...formData, destinations: ids }
    setFormData(updated)
    const newItinerary = generateItinerary(ids, typeof updated.duration === 'number' ? updated.duration : 7)
    setItinerary(newItinerary)
  }

  const handleDurationChange = (duration: number | 'custom') => {
    const updated = { ...formData, duration }
    setFormData(updated)
    const newItinerary = generateItinerary(
      updated.destinations,
      typeof duration === 'number' ? duration : 7
    )
    setItinerary(newItinerary)
  }

  const handleBudgetChange = (budget: 'budget' | 'standard' | 'luxury') => {
    setFormData({ ...formData, budget })
  }

  const handleInterestsChange = (interests: string[]) => {
    setFormData({ ...formData, interests })
  }

  const handlePassengerChange = (passengerCount: string) => {
    setFormData({ ...formData, passengerCount })
  }

  const handleContactChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 'destinations':
        return formData.destinations.length > 0
      case 'duration':
        return formData.duration !== null
      case 'budget':
        return formData.budget !== null
      case 'interests':
        return formData.interests.length > 0
      case 'passengers':
        return formData.passengerCount !== ''
      case 'contact':
        return (
          formData.fullName.trim() !== '' &&
          formData.country.trim() !== '' &&
          formData.whatsappNumber.trim() !== ''
        )
      default:
        return true
    }
  }

  const currentStepIndex = steps.indexOf(currentStep)

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmitWhatsApp = async () => {
    setIsSubmitting(true)
    try {
      const message = buildCustomTourMessage(formData)
      const whatsappLink = getWhatsAppInquiryLink(message)
      window.open(whatsappLink, '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20">
      <Container>
        {/* Progress indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
          <div className="mb-6 flex items-center justify-between overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isComplete = steps.indexOf(currentStep) > index
              const isActive = currentStep === step

              return (
                <div key={step} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-400 text-slate-900'
                        : isComplete
                          ? 'bg-amber-400/30 text-amber-300'
                          : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {isComplete ? '✓' : index + 1}
                  </motion.div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-8 transition-colors md:w-12 ${
                        isComplete ? 'bg-amber-400/30' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-center text-sm text-gray-400">
            Step {currentStepIndex + 1} of {steps.length}: {stepTitles[currentStep]}
          </p>
        </motion.div>

        {/* Form content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-12 rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            {currentStep === 'destinations' && (
              <DestinationSelector
                destinations={destinations}
                selectedIds={formData.destinations}
                onChange={handleDestinationsChange}
              />
            )}

            {currentStep === 'duration' && (
              <DurationSelector
                value={formData.duration}
                onChange={handleDurationChange}
              />
            )}

            {currentStep === 'budget' && (
              <BudgetSelector
                options={budgetOptions}
                value={formData.budget}
                onChange={handleBudgetChange}
              />
            )}

            {currentStep === 'interests' && (
              <InterestsSelector
                options={interestOptions}
                selected={formData.interests}
                onChange={handleInterestsChange}
              />
            )}

            {currentStep === 'passengers' && (
              <PassengerSelector
                options={passengerOptions}
                value={formData.passengerCount}
                onChange={handlePassengerChange}
              />
            )}

            {currentStep === 'contact' && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">Contact Information</h3>
                  <p className="text-sm text-gray-400">So we can reach you with your custom quote</p>
                </div>

                <div className="space-y-4">
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleContactChange('fullName', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />

                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => handleContactChange('country', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />

                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    type="tel"
                    placeholder="WhatsApp Number (e.g., +1234567890)"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleContactChange('whatsappNumber', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />

                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    type="date"
                    placeholder="Preferred Travel Date (Optional)"
                    value={formData.travelDate || ''}
                    onChange={(e) => handleContactChange('travelDate', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-8">
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">Review Your Request</h3>
                  <p className="text-sm text-gray-400">Make sure everything looks good before submitting</p>
                </div>

                {/* Summary cards */}
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-white/5 p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase text-gray-400">Destinations</p>
                    <p className="text-white">
                      {destinations
                        .filter((d) => formData.destinations.includes(d.id))
                        .map((d) => d.name)
                        .join(', ')}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="rounded-lg bg-white/5 p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase text-gray-400">Duration</p>
                    <p className="text-white">
                      {typeof formData.duration === 'number' ? `${formData.duration} days` : 'Custom'}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-lg bg-white/5 p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase text-gray-400">Budget</p>
                    <p className="text-white capitalize">{formData.budget}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-lg bg-white/5 p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase text-gray-400">Passengers</p>
                    <p className="text-white">{formData.passengerCount}</p>
                  </motion.div>
                </div>

                {/* Itinerary preview */}
                <div>
                  <ItineraryPreview itinerary={itinerary} />
                </div>

                {/* Contact info */}
                <div className="space-y-3 rounded-lg bg-white/5 p-4">
                  <p className="mb-3 text-sm font-semibold text-white">Contact Information</p>
                  <p className="flex justify-between text-sm text-gray-300">
                    <span>Name:</span>
                    <span>{formData.fullName}</span>
                  </p>
                  <p className="flex justify-between text-sm text-gray-300">
                    <span>Country:</span>
                    <span>{formData.country}</span>
                  </p>
                  <p className="flex justify-between text-sm text-gray-300">
                    <span>WhatsApp:</span>
                    <span>{formData.whatsappNumber}</span>
                  </p>
                  {formData.travelDate && (
                    <p className="flex justify-between text-sm text-gray-300">
                      <span>Travel Date:</span>
                      <span>{new Date(formData.travelDate).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4">
            <Button
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
              variant="ghost"
              className="flex-1"
            >
              Back
            </Button>

            {currentStep !== 'review' ? (
              <Button
                onClick={goToNextStep}
                disabled={!canProceedToNext()}
                className="flex-1"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmitWhatsApp}
                disabled={isSubmitting}
                className="flex-1 bg-amber-500 hover:bg-amber-600"
              >
                {isSubmitting ? 'Sending...' : 'Send to WhatsApp'}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}