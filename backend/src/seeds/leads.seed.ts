import { Lead } from '../modules/leads/index.js'
import { leadsData } from './data/leads.data.js'
import { logger } from '../utils/index.js'

export async function seedLeads(): Promise<void> {
  logger.info('Seeding leads...')

  for (const leadData of leadsData) {
    const existing = await Lead.findOne({ email: leadData.email })

    if (existing) {
      await Lead.findByIdAndUpdate(existing._id, leadData)
      logger.info(`Updated lead: ${leadData.name}`)
    } else {
      await Lead.create(leadData)
      logger.info(`Created lead: ${leadData.name}`)
    }
  }

  logger.info(`Leads seed completed. Total: ${leadsData.length}`)
}
