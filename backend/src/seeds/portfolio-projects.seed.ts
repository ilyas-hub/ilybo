import { portfolioProjectService, PortfolioProject } from '../modules/portfolio-projects/index.js'
import { portfolioProjectsData } from './data/portfolio-projects.data.js'
import { logger } from '../utils/index.js'

export async function seedPortfolioProjects(): Promise<void> {
  logger.info('Seeding portfolio projects...')

  const seedSlugs = portfolioProjectsData.map((p) => p.slug)

  // Remove old projects not in current seed data
  await PortfolioProject.deleteMany({ slug: { $nin: seedSlugs } })

  for (const projectData of portfolioProjectsData) {
    const { slug, ...data } = projectData
    const { project, created } = await portfolioProjectService.upsertProject(slug, data)

    if (created) {
      logger.info(`Created portfolio project: ${project.title}`)
    } else {
      logger.info(`Updated portfolio project: ${project.title}`)
    }
  }

  logger.info(`Portfolio projects seed completed. Total: ${portfolioProjectsData.length}`)
}
