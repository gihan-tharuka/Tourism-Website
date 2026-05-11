'use client'

import type { Testimonial } from '@/types/testimonial'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TestimonialCard } from '@/components/home/testimonial-card'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What discerning travelers say about our premium journeys."
          description="Trusted experiences that combine local expertise with private luxury for every stage of the trip."
          align="left"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  )
}
