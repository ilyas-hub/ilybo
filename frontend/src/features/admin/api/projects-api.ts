import { apiClient } from '@/lib/api-client'
import type {
  ProjectStatus,
  ProjectsResponse,
  ProjectResponse,
  ProjectStatsResponse,
  CreateProjectInput,
  UpdateProjectInput,
} from '../types'

export const projectsApi = {
  getProjects: (params?: {
    page?: number
    limit?: number
    status?: ProjectStatus
  }) => {
    const queryParams: Record<string, string> = {}
    if (params?.page) queryParams.page = String(params.page)
    if (params?.limit) queryParams.limit = String(params.limit)
    if (params?.status) queryParams.status = params.status
    return apiClient.get<ProjectsResponse>('/projects', { params: queryParams })
  },

  getProject: (id: string) => apiClient.get<ProjectResponse>(`/projects/${id}`),

  createProject: (data: CreateProjectInput) =>
    apiClient.post<ProjectResponse>('/projects', data),

  createFromLead: (leadId: string, data?: Partial<CreateProjectInput>) =>
    apiClient.post<ProjectResponse>(`/projects/from-lead/${leadId}`, data),

  updateProject: (id: string, data: UpdateProjectInput) =>
    apiClient.patch<ProjectResponse>(`/projects/${id}`, data),

  deleteProject: (id: string) => apiClient.delete(`/projects/${id}`),

  getStats: () => apiClient.get<ProjectStatsResponse>('/projects/stats'),
}
