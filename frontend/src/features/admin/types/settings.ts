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

export interface SiteSettings {
  _id: string
  contact: {
    email: string
    phone: string
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
  updatedBy?: string
  createdAt: string
  updatedAt: string
}

export interface SettingsResponse {
  success: boolean
  data: SiteSettings
}

export interface UpdateSettingsInput {
  contact?: Partial<SiteSettings['contact']>
  socialLinks?: SocialLink[]
  businessHours?: BusinessHours[]
  company?: Partial<SiteSettings['company']>
  seo?: Partial<SiteSettings['seo']>
}
