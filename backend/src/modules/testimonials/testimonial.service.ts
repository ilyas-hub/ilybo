import { Testimonial, type ITestimonial } from './testimonial.model.js'
import { NotFoundError } from '../../utils/index.js'

export async function findActiveTestimonials(): Promise<ITestimonial[]> {
  return Testimonial.find({ isActive: true }).sort({ order: 1 })
}

export async function findAllTestimonials(
  page = 1,
  limit = 20
): Promise<{ testimonials: ITestimonial[]; total: number }> {
  const skip = (page - 1) * limit
  const [testimonials, total] = await Promise.all([
    Testimonial.find().sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    Testimonial.countDocuments(),
  ])
  return { testimonials, total }
}

export async function createTestimonial(data: {
  name: string
  company: string
  initials: string
  review: string
  order?: number
  isActive?: boolean
}): Promise<ITestimonial> {
  return Testimonial.create(data)
}

export async function updateTestimonial(
  id: string,
  data: Partial<{ name: string; company: string; initials: string; review: string; order: number; isActive: boolean }>
): Promise<ITestimonial> {
  const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true })
  if (!testimonial) {
    throw new NotFoundError('Testimonial not found')
  }
  return testimonial
}

export async function deleteTestimonial(id: string): Promise<void> {
  const testimonial = await Testimonial.findByIdAndDelete(id)
  if (!testimonial) {
    throw new NotFoundError('Testimonial not found')
  }
}

export async function upsertTestimonial(
  name: string,
  data: { company: string; initials: string; review: string; order: number; isActive: boolean }
): Promise<{ testimonial: ITestimonial; created: boolean }> {
  const existing = await Testimonial.findOne({ name })

  if (existing) {
    const updated = await Testimonial.findByIdAndUpdate(existing._id, { ...data, name }, { new: true })
    return { testimonial: updated!, created: false }
  }

  const testimonial = await Testimonial.create({ ...data, name })
  return { testimonial, created: true }
}
