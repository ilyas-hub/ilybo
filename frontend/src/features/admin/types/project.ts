export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'

export interface Project {
  _id: string
  name: string
  description: string
  leadId?: string
  clientName: string
  clientEmail: string
  clientCompany?: string
  status: ProjectStatus
  serviceType: string
  budget?: {
    amount: number
    currency: string
  }
  startDate?: string
  endDate?: string
  notes: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface ProjectStats {
  total: number
  byStatus: Record<ProjectStatus, number>
}

export interface ProjectsResponse {
  success: boolean
  data: Project[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ProjectResponse {
  success: boolean
  data: Project
}

export interface ProjectStatsResponse {
  success: boolean
  data: ProjectStats
}

export interface CreateProjectInput {
  name: string
  description: string
  clientName: string
  clientEmail: string
  clientCompany?: string
  serviceType: string
  budget?: {
    amount: number
    currency: string
  }
  startDate?: string
  endDate?: string
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  status?: ProjectStatus
  notes?: string[]
}
