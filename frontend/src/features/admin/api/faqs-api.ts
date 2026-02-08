import { apiClient } from '@/lib/api-client'
import type { FAQsResponse, FAQResponse } from '../types'

export const faqsApi = {
  getAll: (params?: { page?: number; limit?: number }) => {
    const queryParams: Record<string, string> = {}
    if (params?.page) queryParams.page = String(params.page)
    if (params?.limit) queryParams.limit = String(params.limit)
    return apiClient.get<FAQsResponse>('/faqs/admin', { params: queryParams })
  },

  create: (data: { question: string; answer: string; order?: number; isActive?: boolean }) =>
    apiClient.post<FAQResponse>('/faqs', data),

  update: (id: string, data: Partial<{ question: string; answer: string; order: number; isActive: boolean }>) =>
    apiClient.patch<FAQResponse>(`/faqs/${id}`, data),

  delete: (id: string) => apiClient.delete(`/faqs/${id}`),
}
