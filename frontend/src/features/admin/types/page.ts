export type PageType = 'legal' | 'content' | 'landing' | 'custom'
export type PageStatus = 'draft' | 'published' | 'archived'
export type ContentFormat = 'markdown' | 'html'

export interface PageVersion {
  version: number
  title: string
  content: string
  createdAt: string
  createdBy: string
}

export interface Page {
  _id: string
  slug: string
  title: string
  content: string
  contentFormat: ContentFormat
  type: PageType
  status: PageStatus
  metaTitle?: string
  metaDescription?: string
  currentVersion: number
  versions: PageVersion[]
  showInNavigation: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PagesResponse {
  success: boolean
  data: Page[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PageResponse {
  success: boolean
  data: Page
}

export interface CreatePageInput {
  slug: string
  title: string
  content: string
  contentFormat?: ContentFormat
  type?: PageType
  status?: PageStatus
  metaTitle?: string
  metaDescription?: string
  showInNavigation?: boolean
}

export interface UpdatePageInput extends Partial<CreatePageInput> {}
