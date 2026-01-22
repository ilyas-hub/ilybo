import { Lead, type ILead, type LeadStatus } from './lead.model.js'
import { NotFoundError } from '../../utils/index.js'

export async function findAllLeads(
  page = 1,
  limit = 10,
  status?: LeadStatus
): Promise<{ leads: ILead[]; total: number }> {
  const skip = (page - 1) * limit
  const query = status ? { status } : {}

  const [leads, total] = await Promise.all([
    Lead.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Lead.countDocuments(query),
  ])

  return { leads, total }
}

export async function findLeadById(id: string): Promise<ILead> {
  const lead = await Lead.findById(id)
  if (!lead) {
    throw new NotFoundError('Lead not found')
  }
  return lead
}

export async function createLead(data: {
  name: string
  email: string
  company?: string
  message: string
}): Promise<ILead> {
  return Lead.create(data)
}

export async function updateLead(
  id: string,
  data: Partial<{
    status: LeadStatus
    notes: string
  }>
): Promise<ILead> {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true })
  if (!lead) {
    throw new NotFoundError('Lead not found')
  }
  return lead
}

export async function deleteLead(id: string): Promise<void> {
  const lead = await Lead.findByIdAndDelete(id)
  if (!lead) {
    throw new NotFoundError('Lead not found')
  }
}

export async function getLeadStats(): Promise<{
  total: number
  byStatus: Record<LeadStatus, number>
}> {
  const [total, statusCounts] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
  ])

  const byStatus: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  }

  statusCounts.forEach((item: { _id: LeadStatus; count: number }) => {
    byStatus[item._id] = item.count
  })

  return { total, byStatus }
}
