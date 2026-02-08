import { useQuery } from '@tanstack/react-query'
import { publicFaqsApi } from '../api/faqs-api'

export function usePublicFAQs() {
  return useQuery({
    queryKey: ['faqs', 'public'],
    queryFn: () => publicFaqsApi.getActiveFAQs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
