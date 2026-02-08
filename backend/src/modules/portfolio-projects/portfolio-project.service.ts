import { PortfolioProject, type IPortfolioProject, type ProjectCategory } from './portfolio-project.model.js'
import { NotFoundError, ConflictError } from '../../utils/index.js'
import type { CreatePortfolioProjectInput, UpdatePortfolioProjectInput } from './portfolio-project.validation.js'

// Public methods

export async function findPublishedProjects(category?: string): Promise<IPortfolioProject[]> {
  const query: Record<string, unknown> = { isPublished: true }
  if (category) {
    query.category = category as ProjectCategory
  }
  return PortfolioProject.find(query).sort({ displayOrder: 1, createdAt: -1 })
}

export async function findBySlug(slug: string): Promise<IPortfolioProject> {
  const project = await PortfolioProject.findOne({ slug, isPublished: true })
  if (!project) {
    throw new NotFoundError('Portfolio project not found')
  }
  return project
}

// Admin methods

export async function findAllProjects(): Promise<IPortfolioProject[]> {
  return PortfolioProject.find().sort({ displayOrder: 1, createdAt: -1 })
}

export async function createProject(
  data: CreatePortfolioProjectInput,
  userId: string
): Promise<IPortfolioProject> {
  const existing = await PortfolioProject.findOne({ slug: data.slug })
  if (existing) {
    throw new ConflictError('Portfolio project with this slug already exists')
  }
  return PortfolioProject.create({ ...data, createdBy: userId })
}

export async function updateProject(
  id: string,
  data: UpdatePortfolioProjectInput
): Promise<IPortfolioProject> {
  if (data.slug) {
    const existing = await PortfolioProject.findOne({ slug: data.slug, _id: { $ne: id } })
    if (existing) {
      throw new ConflictError('Portfolio project with this slug already exists')
    }
  }

  const project = await PortfolioProject.findByIdAndUpdate(id, data, { new: true })
  if (!project) {
    throw new NotFoundError('Portfolio project not found')
  }
  return project
}

export async function deleteProject(id: string): Promise<void> {
  const project = await PortfolioProject.findByIdAndDelete(id)
  if (!project) {
    throw new NotFoundError('Portfolio project not found')
  }
}

export async function togglePublish(id: string): Promise<IPortfolioProject> {
  const project = await PortfolioProject.findById(id)
  if (!project) {
    throw new NotFoundError('Portfolio project not found')
  }
  project.isPublished = !project.isPublished
  await project.save()
  return project
}

export async function upsertProject(
  slug: string,
  data: Omit<CreatePortfolioProjectInput, 'slug'>
): Promise<{ project: IPortfolioProject; created: boolean }> {
  const existing = await PortfolioProject.findOne({ slug })

  if (existing) {
    const updated = await PortfolioProject.findByIdAndUpdate(
      existing._id,
      { ...data, slug },
      { new: true }
    )
    return { project: updated!, created: false }
  }

  const project = await PortfolioProject.create({ ...data, slug })
  return { project, created: true }
}
