import { apiClient } from '@/lib/api-client'
import type {
  PageStatus,
  PageType,
  PagesResponse,
  PageResponse,
  CreatePageInput,
  UpdatePageInput,
} from '../types'

export const pagesApi = {
  getPages: (params?: {
    page?: number
    limit?: number
    status?: PageStatus
    type?: PageType
  }) => {
    const queryParams: Record<string, string> = {}
    if (params?.page) queryParams.page = String(params.page)
    if (params?.limit) queryParams.limit = String(params.limit)
    if (params?.status) queryParams.status = params.status
    if (params?.type) queryParams.type = params.type
    return apiClient.get<PagesResponse>('/pages', { params: queryParams })
  },

  getPage: (id: string) => apiClient.get<PageResponse>(`/pages/${id}`),

  createPage: (data: CreatePageInput) =>
    apiClient.post<PageResponse>('/pages', data),

  updatePage: (id: string, data: UpdatePageInput) =>
    apiClient.patch<PageResponse>(`/pages/${id}`, data),

  deletePage: (id: string) => apiClient.delete(`/pages/${id}`),

  publishPage: (id: string) =>
    apiClient.post<PageResponse>(`/pages/${id}/publish`),

  getVersionHistory: (id: string) =>
    apiClient.get<{ success: boolean; data: { versions: Array<{ version: number; title: string; createdAt: string }> } }>(`/pages/${id}/versions`),

  revertToVersion: (id: string, version: number) =>
    apiClient.post<PageResponse>(`/pages/${id}/revert/${version}`),
}
