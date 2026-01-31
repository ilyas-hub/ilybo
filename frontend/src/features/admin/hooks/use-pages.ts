import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pagesApi } from '../api/pages-api'
import type { PageStatus, PageType, CreatePageInput, UpdatePageInput } from '../types'

export function usePages(params?: {
  page?: number
  limit?: number
  status?: PageStatus
  type?: PageType
}) {
  return useQuery({
    queryKey: ['pages', params],
    queryFn: () => pagesApi.getPages(params),
  })
}

export function usePage(id: string) {
  return useQuery({
    queryKey: ['pages', id],
    queryFn: () => pagesApi.getPage(id),
    enabled: !!id,
  })
}

export function useCreatePage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePageInput) => pagesApi.createPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}

export function useUpdatePage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePageInput }) =>
      pagesApi.updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}

export function useDeletePage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => pagesApi.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}

export function usePublishPage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => pagesApi.publishPage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}

export function usePageVersionHistory(id: string) {
  return useQuery({
    queryKey: ['pages', id, 'versions'],
    queryFn: () => pagesApi.getVersionHistory(id),
    enabled: !!id,
  })
}

export function useRevertPageVersion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, version }: { id: string; version: number }) =>
      pagesApi.revertToVersion(id, version),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}
