import { apiClient } from '@/lib/api-client'

export interface DashboardStats {
  leads: {
    total: number
    new: number
    converted: number
    conversionRate: number
  }
  projects: {
    total: number
    active: number
    completed: number
  }
}

export interface DashboardStatsResponse {
  success: boolean
  data: DashboardStats
}

export const statsApi = {
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    // Combine lead and project stats for dashboard
    const [leadsResponse, projectsResponse] = await Promise.all([
      apiClient.get<{ success: boolean; data: { total: number; byStatus: Record<string, number> } }>('/leads/stats'),
      apiClient.get<{ success: boolean; data: { total: number; byStatus: Record<string, number> } }>('/projects/stats').catch(() => ({
        success: true,
        data: { total: 0, byStatus: { planning: 0, in_progress: 0, completed: 0 } }
      })),
    ])

    const leadStats = leadsResponse.data
    const projectStats = projectsResponse.data

    return {
      success: true,
      data: {
        leads: {
          total: leadStats.total,
          new: leadStats.byStatus?.new || 0,
          converted: leadStats.byStatus?.converted || 0,
          conversionRate: leadStats.total > 0
            ? Math.round(((leadStats.byStatus?.converted || 0) / leadStats.total) * 100)
            : 0,
        },
        projects: {
          total: projectStats.total,
          active: (projectStats.byStatus?.planning || 0) + (projectStats.byStatus?.in_progress || 0),
          completed: projectStats.byStatus?.completed || 0,
        },
      },
    }
  },
}
