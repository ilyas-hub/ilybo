import 'dotenv/config'
import { connectDatabase, env } from '../config/index.js'
import { logger } from '../utils/index.js'
import { seedServices } from './services.seed.js'
import { seedAdmin } from './admin.seed.js'
import { seedPages } from './pages.seed.js'
import { seedPortfolioProjects } from './portfolio-projects.seed.js'
import { seedLeads } from './leads.seed.js'
import { seedFAQs } from './faqs.seed.js'
import { seedTestimonials } from './testimonials.seed.js'
import mongoose from 'mongoose'

async function runSeeds(): Promise<void> {
  if (env.NODE_ENV === 'production' && !env.FORCE_SEED) {
    logger.warn('Seeding is disabled in production. Set FORCE_SEED=true to override.')
    process.exit(0)
  }

  try {
    await connectDatabase()

    logger.info('Starting database seeds...')

    await seedServices()
    await seedAdmin()
    await seedPages()
    await seedPortfolioProjects()
    await seedLeads()
    await seedFAQs()
    await seedTestimonials()

    logger.info('All seeds completed successfully!')
  } catch (error) {
    logger.error('Seed error:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    logger.info('Database connection closed')
  }
}

runSeeds()
