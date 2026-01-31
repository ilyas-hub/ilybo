import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pagesApi, type PageStatus, type CreatePageInput, type UpdatePageInput } from '../api'

export function usePage(slug: string) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: () => pagesApi.getPageBySlug(slug),
    enabled: !!slug,
  })
}

export function useAdminPages(status?: PageStatus) {
  return useQuery({
    queryKey: ['admin-pages', status],
    queryFn: () => pagesApi.getPages(status),
  })
}

export function useAdminPage(id: string) {
  return useQuery({
    queryKey: ['admin-page', id],
    queryFn: () => pagesApi.getPage(id),
    enabled: !!id,
  })
}

export function useCreatePage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePageInput) => pagesApi.createPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] })
    },
  })
}

export function useUpdatePage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePageInput }) =>
      pagesApi.updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] })
    },
  })
}

export function useDeletePage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => pagesApi.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] })
    },
  })
}

export function usePublishPage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => pagesApi.publishPage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] })
    },
  })
}

export function usePageVersions(id: string) {
  return useQuery({
    queryKey: ['page-versions', id],
    queryFn: () => pagesApi.getVersionHistory(id),
    enabled: !!id,
  })
}

export function useRevertPage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, version }: { id: string; version: number }) =>
      pagesApi.revertToVersion(id, version),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] })
      queryClient.invalidateQueries({ queryKey: ['page-versions'] })
    },
  })
}
