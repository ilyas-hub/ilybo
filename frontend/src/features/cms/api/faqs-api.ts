import { apiClient } from '@/lib/api-client'

export interface PublicFAQ {
  _id: string
  question: string
  answer: string
  order: number
}

export interface PublicFAQsResponse {
  success: boolean
  data: PublicFAQ[]
}

export const publicFaqsApi = {
  getActiveFAQs: () => apiClient.get<PublicFAQsResponse>('/faqs'),
}
