import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialsApi } from '../api/testimonials-api'
import type { Testimonial } from '../types'

export function useTestimonials(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['testimonials', 'admin', params],
    queryFn: () => testimonialsApi.getAll(params),
  })
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; company: string; initials: string; review: string; order?: number; isActive?: boolean }) =>
      testimonialsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pick<Testimonial, 'name' | 'company' | 'initials' | 'review' | 'order' | 'isActive'>> }) =>
      testimonialsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })
}
