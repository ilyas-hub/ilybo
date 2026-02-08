import { testimonialService } from '../modules/testimonials/index.js'
import { testimonialsData } from './data/testimonials.data.js'
import { logger } from '../utils/index.js'

export async function seedTestimonials(): Promise<void> {
  logger.info('Seeding testimonials...')

  for (const testimonialData of testimonialsData) {
    const { name, ...data } = testimonialData
    const { testimonial, created } = await testimonialService.upsertTestimonial(name, data)

    if (created) {
      logger.info(`Created testimonial: ${testimonial.name}`)
    } else {
      logger.info(`Updated testimonial: ${testimonial.name}`)
    }
  }

  logger.info(`Testimonials seed completed. Total: ${testimonialsData.length}`)
}
