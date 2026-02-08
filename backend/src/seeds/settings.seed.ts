import { SiteSettings } from '../modules/settings/settings.model.js'
import { defaultSettings } from './data/settings.data.js'
import { logger } from '../utils/index.js'

export async function seedSettings(): Promise<void> {
  logger.info('Seeding settings (social links)...')

  const existing = await SiteSettings.findOne()

  if (existing) {
    existing.socialLinks = defaultSettings.socialLinks as typeof existing.socialLinks
    await existing.save()
    logger.info('Updated social links in existing settings')
  } else {
    await SiteSettings.create(defaultSettings)
    logger.info('Created new settings document')
  }

  logger.info('Settings seed completed')
}
