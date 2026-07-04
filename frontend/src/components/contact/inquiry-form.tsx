'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select'
import { Textarea } from '@/components/shadcn/textarea'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { trackInquiryCreated, trackWhatsAppClick } from '@/lib/analytics'
import { createContactInquiry } from '@/services/inquiry.service'
import type { ContactInquiryPayload } from '@/types/inquiry'

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
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')

  const canSubmit =
    formData.fullName.trim() &&
    formData.country.trim() &&
    formData.email.trim() &&
    formData.whatsappNumber.trim() &&
    formData.message.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

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

    const inquiryTypeMap: Record<string, ContactInquiryPayload['inquiryType']> = {
      general: 'General Inquiry',
      tour: 'Tour Inquiry',
      'custom-tour': 'Custom Tour',
      transfers: 'Transfers',
      other: 'General Inquiry',
    }

    try {
      await createContactInquiry({
        fullName: formData.fullName,
        country: formData.country,
        email: formData.email,
        whatsapp: formData.whatsappNumber,
        inquiryType: inquiryTypeMap[formData.inquiryType] ?? 'General Inquiry',
        message: formData.message,
      })

      trackInquiryCreated('contact')
      const encoded = encodeURIComponent(message)
      setWhatsappUrl(`https://wa.me/?text=${encoded}`)
      setSubmitSuccess(true)

      setFormData({
        fullName: '',
        country: '',
        email: '',
        whatsappNumber: '',
        inquiryType: 'general',
        message: '',
      })
    } catch {
      setSubmitError('Unable to save inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenWhatsApp = () => {
    if (!whatsappUrl) {
      return
    }

    window.open(whatsappUrl, '_blank')
    trackWhatsAppClick('contact')
  }

  const handleSuccessDialogChange = (open: boolean) => {
    setSubmitSuccess(open)

    if (!open) {
      setWhatsappUrl('')
    }
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  viewport={{ once: true }}
                >
                  <Label htmlFor="contact-full-name" className="sr-only">
                    Full name
                  </Label>
                  <Input
                    id="contact-full-name"
                    aria-label="Full name"
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-auto w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  viewport={{ once: true }}
                >
                  <Label htmlFor="contact-country" className="sr-only">
                    Country
                  </Label>
                  <Input
                    id="contact-country"
                    aria-label="Country"
                    type="text"
                    placeholder="Country *"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="h-auto w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    required
                  />
                </motion.div>
              </div>

              {/* Email and WhatsApp Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Label htmlFor="contact-email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="contact-email"
                    aria-label="Email address"
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-auto w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <Label htmlFor="contact-whatsapp" className="sr-only">
                    WhatsApp number
                  </Label>
                  <Input
                    id="contact-whatsapp"
                    aria-label="WhatsApp number"
                    type="tel"
                    placeholder="WhatsApp Number *"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="h-auto w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    required
                  />
                </motion.div>
              </div>

              {/* Inquiry Type */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="contact-inquiry-type" className="sr-only">
                  Inquiry type
                </Label>
                <Select
                value={formData.inquiryType}
                  onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                >
                  <SelectTrigger
                    id="contact-inquiry-type"
                    aria-label="Inquiry type"
                    className="h-auto w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    <SelectValue placeholder="Inquiry Type" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-slate-900 text-white">
                    <SelectItem value="general" className="focus:bg-white/10 focus:text-white">
                      General Inquiry
                    </SelectItem>
                    <SelectItem value="tour" className="focus:bg-white/10 focus:text-white">
                      Tour Inquiry
                    </SelectItem>
                    <SelectItem value="custom-tour" className="focus:bg-white/10 focus:text-white">
                      Custom Tour
                    </SelectItem>
                    <SelectItem value="transfers" className="focus:bg-white/10 focus:text-white">
                      Transfers
                    </SelectItem>
                    <SelectItem value="other" className="focus:bg-white/10 focus:text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
              >
                <Label htmlFor="contact-message" className="sr-only">
                  Your message
                </Label>
                <Textarea
                  id="contact-message"
                  aria-label="Your message"
                  placeholder="Your Message *"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-0 w-full rounded-lg border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving Inquiry...' : 'Send via WhatsApp'}
              </Button>

              {submitError && (
                <p className="text-center text-sm font-medium text-red-300">{submitError}</p>
              )}

              <p className="text-center text-xs text-gray-400">
                * Required fields. We&apos;ll respond on WhatsApp typically within 15 minutes.
              </p>
            </div>
          </motion.form>
        </div>

        <Dialog open={submitSuccess} onOpenChange={handleSuccessDialogChange}>
          <DialogContent className="max-w-md rounded-2xl border-white/10 bg-slate-900 p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Inquiry saved</DialogTitle>
              <DialogDescription className="leading-6 text-slate-300">
                Your inquiry has been saved. Continue to WhatsApp to begin the conversation.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleOpenWhatsApp}>Open WhatsApp</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </section>
  )
}
