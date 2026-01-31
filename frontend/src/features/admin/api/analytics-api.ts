import { apiClient } from '@/lib/api-client'
import type { LeadStatsResponse, ProjectStatsResponse } from '../types'

export interface AnalyticsData {
  leads: {
    total: number
    byStatus: {
      new: number
      contacted: number
      qualified: number
      converted: number
      lost: number
    }
    conversionRate: number
  }
  projects: {
    total: number
    byStatus: {
      planning: number
      in_progress: number
      on_hold: number
      completed: number
      cancelled: number
    }
    completionRate: number
  }
}

export interface AnalyticsResponse {
  success: boolean
  data: AnalyticsData
}

export const analyticsApi = {
  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const [leadsResponse, projectsResponse] = await Promise.all([
      apiClient.get<LeadStatsResponse>('/leads/stats'),
      apiClient.get<ProjectStatsResponse>('/projects/stats').catch(() => ({
        success: true,
        data: { total: 0, byStatus: { planning: 0, in_progress: 0, on_hold: 0, completed: 0, cancelled: 0 } }
      })),
    ])

    const leadStats = leadsResponse.data
    const projectStats = projectsResponse.data

    const leadTotal = leadStats.total || 0
    const convertedLeads = leadStats.byStatus?.converted || 0
    const projectTotal = projectStats.total || 0
    const completedProjects = projectStats.byStatus?.completed || 0

    return {
      success: true,
      data: {
        leads: {
          total: leadTotal,
          byStatus: {
            new: leadStats.byStatus?.new || 0,
            contacted: leadStats.byStatus?.contacted || 0,
            qualified: leadStats.byStatus?.qualified || 0,
            converted: convertedLeads,
            lost: leadStats.byStatus?.lost || 0,
          },
          conversionRate: leadTotal > 0 ? Math.round((convertedLeads / leadTotal) * 100) : 0,
        },
        projects: {
          total: projectTotal,
          byStatus: {
            planning: projectStats.byStatus?.planning || 0,
            in_progress: projectStats.byStatus?.in_progress || 0,
            on_hold: projectStats.byStatus?.on_hold || 0,
            completed: completedProjects,
            cancelled: projectStats.byStatus?.cancelled || 0,
          },
          completionRate: projectTotal > 0 ? Math.round((completedProjects / projectTotal) * 100) : 0,
        },
      },
    }
  },
}
