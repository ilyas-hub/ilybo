import { Page } from '../modules/pages/index.js'
import { User } from '../modules/users/index.js'
import { logger } from '../utils/index.js'
import { defaultPages } from './data/pages.data.js'

export async function seedPages(): Promise<void> {
  try {
    // Find admin user for createdBy
    const adminUser = await User.findOne({ role: 'admin' })
    if (!adminUser) {
      logger.warn('No admin user found, skipping pages seed')
      return
    }

    for (const pageData of defaultPages) {
      const existingPage = await Page.findOne({ slug: pageData.slug })

      if (existingPage) {
        logger.info(`Page "${pageData.slug}" already exists, skipping`)
        continue
      }

      await Page.create({
        ...pageData,
        currentVersion: 1,
        versions: [
          {
            version: 1,
            title: pageData.title,
            content: pageData.content,
            createdAt: new Date(),
            createdBy: adminUser._id,
          },
        ],
        createdBy: adminUser._id,
      })

      logger.info(`Created page: ${pageData.slug}`)
    }

    logger.info('Pages seed completed')
  } catch (error) {
    logger.error('Pages seed failed:', error)
    throw error
  }
}
