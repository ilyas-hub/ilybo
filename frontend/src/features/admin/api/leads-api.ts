import { apiClient } from '@/lib/api-client'
import type {
  Lead,
  LeadStatus,
  LeadsResponse,
  LeadResponse,
  LeadStatsResponse,
} from '../types'

export const leadsApi = {
  getLeads: (params?: {
    page?: number
    limit?: number
    status?: LeadStatus
  }) => {
    const queryParams: Record<string, string> = {}
    if (params?.page) queryParams.page = String(params.page)
    if (params?.limit) queryParams.limit = String(params.limit)
    if (params?.status) queryParams.status = params.status
    return apiClient.get<LeadsResponse>('/leads', { params: queryParams })
  },

  getLead: (id: string) => apiClient.get<LeadResponse>(`/leads/${id}`),

  updateLead: (id: string, data: Partial<Pick<Lead, 'status' | 'notes'>>) =>
    apiClient.patch<LeadResponse>(`/leads/${id}`, data),

  deleteLead: (id: string) => apiClient.delete(`/leads/${id}`),

  getStats: () => apiClient.get<LeadStatsResponse>('/leads/stats'),
}
