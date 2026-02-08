import { faqService } from '../modules/faqs/index.js'
import { faqsData } from './data/faqs.data.js'
import { logger } from '../utils/index.js'

export async function seedFAQs(): Promise<void> {
  logger.info('Seeding FAQs...')

  for (const faqData of faqsData) {
    const { question, ...data } = faqData
    const { faq, created } = await faqService.upsertFAQ(question, data)

    if (created) {
      logger.info(`Created FAQ: ${faq.question.slice(0, 50)}...`)
    } else {
      logger.info(`Updated FAQ: ${faq.question.slice(0, 50)}...`)
    }
  }

  logger.info(`FAQs seed completed. Total: ${faqsData.length}`)
}
