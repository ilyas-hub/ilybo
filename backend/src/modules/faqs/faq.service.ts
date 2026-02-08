import { FAQ, type IFAQ } from './faq.model.js'
import { NotFoundError } from '../../utils/index.js'

export async function findActiveFAQs(): Promise<IFAQ[]> {
  return FAQ.find({ isActive: true }).sort({ order: 1 })
}

export async function findAllFAQs(
  page = 1,
  limit = 20
): Promise<{ faqs: IFAQ[]; total: number }> {
  const skip = (page - 1) * limit
  const [faqs, total] = await Promise.all([
    FAQ.find().sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    FAQ.countDocuments(),
  ])
  return { faqs, total }
}

export async function createFAQ(data: {
  question: string
  answer: string
  order?: number
  isActive?: boolean
}): Promise<IFAQ> {
  return FAQ.create(data)
}

export async function updateFAQ(
  id: string,
  data: Partial<{ question: string; answer: string; order: number; isActive: boolean }>
): Promise<IFAQ> {
  const faq = await FAQ.findByIdAndUpdate(id, data, { new: true })
  if (!faq) {
    throw new NotFoundError('FAQ not found')
  }
  return faq
}

export async function deleteFAQ(id: string): Promise<void> {
  const faq = await FAQ.findByIdAndDelete(id)
  if (!faq) {
    throw new NotFoundError('FAQ not found')
  }
}

export async function upsertFAQ(
  question: string,
  data: { answer: string; order: number; isActive: boolean }
): Promise<{ faq: IFAQ; created: boolean }> {
  const existing = await FAQ.findOne({ question })

  if (existing) {
    const updated = await FAQ.findByIdAndUpdate(existing._id, { ...data, question }, { new: true })
    return { faq: updated!, created: false }
  }

  const faq = await FAQ.create({ ...data, question })
  return { faq, created: true }
}
