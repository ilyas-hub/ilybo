import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { faqsApi } from '../api/faqs-api'
import type { FAQ } from '../types'

export function useFAQs(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['faqs', 'admin', params],
    queryFn: () => faqsApi.getAll(params),
  })
}

export function useCreateFAQ() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { question: string; answer: string; order?: number; isActive?: boolean }) =>
      faqsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })
}

export function useUpdateFAQ() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pick<FAQ, 'question' | 'answer' | 'order' | 'isActive'>> }) =>
      faqsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })
}

export function useDeleteFAQ() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => faqsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })
}
