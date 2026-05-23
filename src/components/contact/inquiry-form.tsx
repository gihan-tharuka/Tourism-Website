'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

interface InquiryFormData {
  fullName: string
  country: string
  email: string
  whatsappNumber: string
  inquiryType: string
  message: string
}

export function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    country: '',
    email: '',
    whatsappNumber: '',
    inquiryType: 'general',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit =
    formData.fullName.trim() &&
    formData.country.trim() &&
    formData.email.trim() &&
    formData.whatsappNumber.trim() &&
    formData.message.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare WhatsApp message
    const message = [
      '*New Inquiry From Website*',
      '',
      `*Name:* ${formData.fullName}`,
      `*Country:* ${formData.country}`,
      `*Email:* ${formData.email}`,
      `*WhatsApp:* ${formData.whatsappNumber}`,
      `*Inquiry Type:* ${formData.inquiryType}`,
      '',
      `*Message:*`,
      formData.message,
    ].join('\n')

    const encoded = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encoded}`
    window.open(whatsappUrl, '_blank')

    setIsSubmitting(false)
    setFormData({
      fullName: '',
      country: '',
      email: '',
      whatsappNumber: '',
      inquiryType: 'general',
      message: '',
    })
  }

  return (
    <section className="border-t border-white/5 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Send us a message
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Inquiry Form</h2>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <div className="space-y-4">
              {/* Name and Country Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <motion.input
                  aria-label="Full name"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  viewport={{ once: true }}
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
                <motion.input
                  aria-label="Country"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  viewport={{ once: true }}
                  type="text"
                  placeholder="Country *"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>

              {/* Email and WhatsApp Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <motion.input
                  aria-label="Email address"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
                <motion.input
                  aria-label="WhatsApp number"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                  type="tel"
                  placeholder="WhatsApp Number *"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>

              {/* Inquiry Type */}
              <motion.select
                aria-label="Inquiry type"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option value="general" className="bg-slate-900">
                  General Inquiry
                </option>
                <option value="tour" className="bg-slate-900">
                  Tour Inquiry
                </option>
                <option value="custom-tour" className="bg-slate-900">
                  Custom Tour
                </option>
                <option value="transfers" className="bg-slate-900">
                  Transfers
                </option>
                <option value="other" className="bg-slate-900">
                  Other
                </option>
              </motion.select>

              {/* Message */}
              <motion.textarea
                aria-label="Your message"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
                placeholder="Your Message *"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                required
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending to WhatsApp...' : 'Send via WhatsApp'}
              </Button>

              <p className="text-center text-xs text-gray-400">
                * Required fields. We&apos;ll respond on WhatsApp typically within 15 minutes.
              </p>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  )
}
