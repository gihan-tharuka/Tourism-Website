import { testimonials } from '@/data/testimonials'
import type { Testimonial } from '@/types/testimonial'

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return testimonials
}
