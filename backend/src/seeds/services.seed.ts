import { serviceService } from '../modules/services/index.js'
import { servicesData } from './data/services.data.js'
import { logger } from '../utils/index.js'

export async function seedServices(): Promise<void> {
  logger.info('Seeding services...')

  for (const serviceData of servicesData) {
    const { slug, ...data } = serviceData
    const { service, created } = await serviceService.upsertService(slug, data)

    if (created) {
      logger.info(`Created service: ${service.name}`)
    } else {
      logger.info(`Updated service: ${service.name}`)
    }
  }

  logger.info(`Services seed completed. Total: ${servicesData.length}`)
}
