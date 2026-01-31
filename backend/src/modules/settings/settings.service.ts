import { SiteSettings, type ISiteSettings } from './settings.model.js'
import type { UpdateSettingsInput } from './settings.validation.js'

const DEFAULT_SETTINGS = {
  contact: {
    email: 'hello@ilybo.com',
    phone: '+91 98765 43210',
    address: {
      city: 'Mumbai',
      country: 'India',
    },
  },
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/ilybo', isActive: true },
    { platform: 'linkedin', url: 'https://linkedin.com/company/ilybo', isActive: true },
    { platform: 'github', url: 'https://github.com/ilybo', isActive: true },
  ],
  businessHours: [
    { day: 'Monday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Tuesday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Wednesday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Thursday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Friday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Saturday', open: '10:00', close: '14:00', isClosed: false },
    { day: 'Sunday', open: '', close: '', isClosed: true },
  ],
  company: {
    name: 'IlyBo',
    tagline: 'Building innovative software solutions',
    description: 'We are a software development company focused on building cutting-edge digital solutions.',
  },
  seo: {
    defaultTitle: 'IlyBo - Software Development',
    defaultDescription: 'IlyBo offers professional software development services including web, mobile, and cloud solutions.',
  },
}

export async function getSettings(): Promise<ISiteSettings> {
  let settings = await SiteSettings.findOne()

  if (!settings) {
    settings = await SiteSettings.create(DEFAULT_SETTINGS)
  }

  return settings
}

export async function updateSettings(
  data: UpdateSettingsInput,
  userId: string
): Promise<ISiteSettings> {
  const settings = await getSettings()

  // Deep merge the updates
  if (data.contact) {
    if (data.contact.email) settings.contact.email = data.contact.email
    if (data.contact.phone) settings.contact.phone = data.contact.phone
    if (data.contact.address) {
      if (data.contact.address.street !== undefined) settings.contact.address.street = data.contact.address.street
      if (data.contact.address.city) settings.contact.address.city = data.contact.address.city
      if (data.contact.address.state !== undefined) settings.contact.address.state = data.contact.address.state
      if (data.contact.address.country) settings.contact.address.country = data.contact.address.country
      if (data.contact.address.postalCode !== undefined) settings.contact.address.postalCode = data.contact.address.postalCode
    }
  }

  if (data.socialLinks) {
    settings.socialLinks = data.socialLinks as typeof settings.socialLinks
  }

  if (data.businessHours) {
    settings.businessHours = data.businessHours.map((h) => ({
      day: h.day,
      open: h.open || '',
      close: h.close || '',
      isClosed: h.isClosed,
    })) as typeof settings.businessHours
  }

  if (data.company) {
    if (data.company.name) settings.company.name = data.company.name
    if (data.company.tagline !== undefined) settings.company.tagline = data.company.tagline
    if (data.company.description !== undefined) settings.company.description = data.company.description
  }

  if (data.seo) {
    if (data.seo.defaultTitle !== undefined) settings.seo.defaultTitle = data.seo.defaultTitle
    if (data.seo.defaultDescription !== undefined) settings.seo.defaultDescription = data.seo.defaultDescription
  }

  settings.updatedBy = userId as unknown as typeof settings.updatedBy

  await settings.save()
  return settings
}
