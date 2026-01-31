import { apiClient } from '@/lib/api-client'

export type PageType = 'legal' | 'content' | 'landing' | 'custom'
export type PageStatus = 'draft' | 'published' | 'archived'
export type ContentFormat = 'markdown' | 'html'

export interface PageVersion {
  version: number
  title: string
  content: string
  createdAt: string
  createdBy: string
}

export interface Page {
  _id: string
  slug: string
  title: string
  content: string
  contentFormat: ContentFormat
  type: PageType
  status: PageStatus
  metaTitle?: string
  metaDescription?: string
  currentVersion: number
  versions?: PageVersion[]
  showInNavigation: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PageResponse {
  success: boolean
  data: Page
}

export interface PagesResponse {
  success: boolean
  data: Page[]
}

export interface VersionsResponse {
  success: boolean
  data: PageVersion[]
}

export interface CreatePageInput {
  slug: string
  title: string
  content: string
  contentFormat?: ContentFormat
  type?: PageType
  status?: PageStatus
  metaTitle?: string
  metaDescription?: string
  showInNavigation?: boolean
}

export interface UpdatePageInput {
  title?: string
  content?: string
  contentFormat?: ContentFormat
  type?: PageType
  status?: PageStatus
  metaTitle?: string
  metaDescription?: string
  showInNavigation?: boolean
}

export const pagesApi = {
  // Public
  getPageBySlug: (slug: string) =>
    apiClient.get<PageResponse>(`/pages/public/${slug}`),

  // Admin
  getPages: (status?: PageStatus) => {
    const params: Record<string, string> = {}
    if (status) params.status = status
    return apiClient.get<PagesResponse>('/pages', { params: Object.keys(params).length > 0 ? params : undefined })
  },

  getPage: (id: string) =>
    apiClient.get<PageResponse>(`/pages/${id}`),

  createPage: (data: CreatePageInput) =>
    apiClient.post<PageResponse>('/pages', data),

  updatePage: (id: string, data: UpdatePageInput) =>
    apiClient.patch<PageResponse>(`/pages/${id}`, data),

  deletePage: (id: string) =>
    apiClient.delete(`/pages/${id}`),

  publishPage: (id: string) =>
    apiClient.post<PageResponse>(`/pages/${id}/publish`),

  getVersionHistory: (id: string) =>
    apiClient.get<VersionsResponse>(`/pages/${id}/versions`),

  revertToVersion: (id: string, version: number) =>
    apiClient.post<PageResponse>(`/pages/${id}/revert/${version}`),
}
