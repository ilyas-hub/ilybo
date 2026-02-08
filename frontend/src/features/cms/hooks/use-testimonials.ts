import { useQuery } from '@tanstack/react-query'
import { publicTestimonialsApi } from '../api/testimonials-api'

export function usePublicTestimonials() {
  return useQuery({
    queryKey: ['testimonials', 'public'],
    queryFn: () => publicTestimonialsApi.getActiveTestimonials(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
