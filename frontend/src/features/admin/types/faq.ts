export interface FAQ {
  _id: string
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQsResponse {
  success: boolean
  data: FAQ[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FAQResponse {
  success: boolean
  data: FAQ
}
