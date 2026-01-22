import { Service, type IService } from './service.model.js'
import { NotFoundError, ConflictError } from '../../utils/index.js'

export async function findAllServices(onlyActive = true): Promise<IService[]> {
  const query = onlyActive ? { isActive: true } : {}
  return Service.find(query).sort({ order: 1, createdAt: -1 })
}

export async function findServiceById(id: string): Promise<IService> {
  const service = await Service.findById(id)
  if (!service) {
    throw new NotFoundError('Service not found')
  }
  return service
}

export async function findServiceBySlug(slug: string): Promise<IService> {
  const service = await Service.findOne({ slug, isActive: true })
  if (!service) {
    throw new NotFoundError('Service not found')
  }
  return service
}

export async function createService(data: {
  name: string
  slug: string
  description: string
  shortDescription: string
  icon: string
  features?: string[]
  order?: number
}): Promise<IService> {
  const existingService = await Service.findOne({ slug: data.slug })
  if (existingService) {
    throw new ConflictError('Service with this slug already exists')
  }

  return Service.create(data)
}

export async function updateService(
  id: string,
  data: Partial<{
    name: string
    slug: string
    description: string
    shortDescription: string
    icon: string
    features: string[]
    isActive: boolean
    order: number
  }>
): Promise<IService> {
  if (data.slug) {
    const existingService = await Service.findOne({
      slug: data.slug,
      _id: { $ne: id },
    })
    if (existingService) {
      throw new ConflictError('Service with this slug already exists')
    }
  }

  const service = await Service.findByIdAndUpdate(id, data, { new: true })
  if (!service) {
    throw new NotFoundError('Service not found')
  }
  return service
}

export async function deleteService(id: string): Promise<void> {
  const service = await Service.findByIdAndDelete(id)
  if (!service) {
    throw new NotFoundError('Service not found')
  }
}

export async function upsertService(
  slug: string,
  data: {
    name: string
    description: string
    shortDescription: string
    icon: string
    features?: string[]
    order?: number
  }
): Promise<{ service: IService; created: boolean }> {
  const existingService = await Service.findOne({ slug })

  if (existingService) {
    const updated = await Service.findByIdAndUpdate(
      existingService._id,
      { ...data, slug },
      { new: true }
    )
    return { service: updated!, created: false }
  }

  const service = await Service.create({ ...data, slug })
  return { service, created: true }
}
