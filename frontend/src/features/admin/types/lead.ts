export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface Lead {
  _id: string
  name: string
  email: string
  company?: string
  message: string
  status: LeadStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface LeadStats {
  total: number
  byStatus: Record<LeadStatus, number>
}

export interface LeadsResponse {
  success: boolean
  data: Lead[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface LeadResponse {
  success: boolean
  data: Lead
}

export interface LeadStatsResponse {
  success: boolean
  data: LeadStats
}
