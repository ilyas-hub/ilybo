import { apiClient } from '@/lib/api-client'

export interface PublicTestimonial {
  _id: string
  name: string
  company: string
  initials: string
  review: string
  order: number
}

export interface PublicTestimonialsResponse {
  success: boolean
  data: PublicTestimonial[]
}

export const publicTestimonialsApi = {
  getActiveTestimonials: () => apiClient.get<PublicTestimonialsResponse>('/testimonials'),
}
