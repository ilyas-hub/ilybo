import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectsApi } from '../api'
import type { ProjectStatus, CreateProjectInput, UpdateProjectInput } from '../types'

export function useProjects(params?: {
  page?: number
  limit?: number
  status?: ProjectStatus
}) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.getProjects(params),
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id,
  })
}

export function useProjectStats() {
  return useQuery({
    queryKey: ['projects', 'stats'],
    queryFn: () => projectsApi.getStats(),
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProjectInput) => projectsApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useCreateProjectFromLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ leadId, data }: { leadId: string; data?: Partial<CreateProjectInput> }) =>
      projectsApi.createFromLead(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectInput }) =>
      projectsApi.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectsApi.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
