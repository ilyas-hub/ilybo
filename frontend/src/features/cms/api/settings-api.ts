import { apiClient } from '@/lib/api-client'

export interface SocialLink {
  platform: string
  url: string
  isActive: boolean
}

export interface BusinessHours {
  day: string
  open: string
  close: string
  isClosed: boolean
}

export interface AboutStat {
  icon: string
  value: string
  label: string
}

export interface AboutContent {
  stats: AboutStat[]
  features: string[]
}

export interface SiteSettings {
  _id: string
  contact: {
    email: string
    phone: string
    whatsapp?: string
    address: {
      street?: string
      city: string
      state?: string
      country: string
      postalCode?: string
    }
  }
  socialLinks: SocialLink[]
  businessHours: BusinessHours[]
  company: {
    name: string
    tagline: string
    description: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
  }
  calendlyUrl?: string
  about: AboutContent
  updatedAt: string
}

export interface SettingsResponse {
  success: boolean
  data: SiteSettings
}

export const settingsApi = {
  getSettings: () => apiClient.get<SettingsResponse>('/settings'),

  updateSettings: (data: Partial<SiteSettings>) =>
    apiClient.patch<SettingsResponse>('/settings', data),
}
