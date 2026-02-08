import { apiClient } from '@/lib/api-client'

export interface PortfolioResult {
  metric: string
  value: string
  description: string
}

export interface PortfolioTestimonial {
  quote: string
  author: string
  position: string
}

export interface PortfolioProject {
  _id: string
  title: string
  slug: string
  tagline: string
  description: string
  client: {
    name: string
    industry: string
  }
  thumbnail: string
  images: string[]
  category: 'web_app' | 'mobile_app' | 'ecommerce' | 'enterprise' | 'saas' | 'custom'
  tags: string[]
  challenge: string
  solution: string
  results: PortfolioResult[]
  duration: string
  teamSize: number
  projectUrl?: string
  testimonial?: PortfolioTestimonial
  featured: boolean
  displayOrder: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioProjectsResponse {
  success: boolean
  data: PortfolioProject[]
}

export interface PortfolioProjectResponse {
  success: boolean
  data: PortfolioProject
}

export const portfolioApi = {
  getPublicProjects: (category?: string) => {
    const params = category ? { category } : undefined
    return apiClient.get<PortfolioProjectsResponse>('/portfolio-projects/public', { params })
  },

  getPublicProjectBySlug: (slug: string) =>
    apiClient.get<PortfolioProjectResponse>(`/portfolio-projects/public/${slug}`),
}
