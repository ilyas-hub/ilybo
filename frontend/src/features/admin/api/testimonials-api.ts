import { apiClient } from '@/lib/api-client'
import type { TestimonialsResponse, TestimonialResponse } from '../types'

export const testimonialsApi = {
  getAll: (params?: { page?: number; limit?: number }) => {
    const queryParams: Record<string, string> = {}
    if (params?.page) queryParams.page = String(params.page)
    if (params?.limit) queryParams.limit = String(params.limit)
    return apiClient.get<TestimonialsResponse>('/testimonials/admin', { params: queryParams })
  },

  create: (data: { name: string; company: string; initials: string; review: string; order?: number; isActive?: boolean }) =>
    apiClient.post<TestimonialResponse>('/testimonials', data),

  update: (id: string, data: Partial<{ name: string; company: string; initials: string; review: string; order: number; isActive: boolean }>) =>
    apiClient.patch<TestimonialResponse>(`/testimonials/${id}`, data),

  delete: (id: string) => apiClient.delete(`/testimonials/${id}`),
}
