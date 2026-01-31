import { useQuery } from '@tanstack/react-query'
import { statsApi } from '../api'

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => statsApi.getDashboardStats(),
    staleTime: 30 * 1000, // 30 seconds
  })
}
