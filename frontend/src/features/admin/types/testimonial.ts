export interface Testimonial {
  _id: string
  name: string
  company: string
  initials: string
  review: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TestimonialsResponse {
  success: boolean
  data: Testimonial[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface TestimonialResponse {
  success: boolean
  data: Testimonial
}
