import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { leadsApi } from '../api'
import type { Lead, LeadStatus } from '../types'

export function useLeads(params?: {
  page?: number
  limit?: number
  status?: LeadStatus
}) {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadsApi.getLeads(params),
  })
}

export function useLead(id: string) {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getLead(id),
    enabled: !!id,
  })
}

export function useLeadStats() {
  return useQuery({
    queryKey: ['leads', 'stats'],
    queryFn: () => leadsApi.getStats(),
  })
}

export function useUpdateLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pick<Lead, 'status' | 'notes'>> }) =>
      leadsApi.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })
}

export function useDeleteLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => leadsApi.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })
}
