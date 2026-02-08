import { useQuery } from '@tanstack/react-query'
import { portfolioApi } from '../api'

export function usePortfolioProjects(category?: string) {
  return useQuery({
    queryKey: ['portfolio-projects', category],
    queryFn: () => portfolioApi.getPublicProjects(category),
    staleTime: 5 * 60 * 1000,
  })
}

export function usePortfolioProject(slug: string) {
  return useQuery({
    queryKey: ['portfolio-project', slug],
    queryFn: () => portfolioApi.getPublicProjectBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  })
}
