import { Lead, type ILead, type LeadStatus } from './lead.model.js'
import { NotFoundError } from '../../utils/index.js'
import { emailService } from '../../services/email/index.js'
import { env } from '../../config/index.js'
import { logger } from '../../utils/index.js'

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
  phone?: string
  company?: string
  message: string
  website?: string
}): Promise<ILead | null> {
  // Honeypot check: if the hidden website field is filled, silently reject
  if (data.website) {
    logger.info('Honeypot triggered, silently rejecting lead submission')
    // Return a fake lead object to avoid revealing the rejection
    return { _id: 'rejected' } as unknown as ILead
  }

  // Remove honeypot field before storing
  const { website: _website, ...leadData } = data

  const sanitizedData = {
    ...leadData,
    message: leadData.message.replace(/<[^>]*>/g, ''),
  }
  const lead = await Lead.create(sanitizedData)

  // Send confirmation email to the lead (non-blocking)
  emailService.sendLeadConfirmation(lead.email, lead.name).catch((err) => {
    logger.error('Failed to send lead confirmation email:', err)
  })

  // Send admin notification email (non-blocking)
  const adminEmail = env.ADMIN_EMAIL || env.SMTP_FROM_EMAIL
  emailService
    .sendAdminLeadNotification(adminEmail, {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
    })
    .catch((err) => {
      logger.error('Failed to send admin lead notification email:', err)
    })

  return lead
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

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

export async function exportLeadsCsv(): Promise<string> {
  const leads = await Lead.find().sort({ createdAt: -1 })

  const header = 'Name,Email,Company,Phone,Message,Status,Created At'
  const rows = leads.map((lead) => {
    return [
      escapeCsvField(lead.name || ''),
      escapeCsvField(lead.email || ''),
      escapeCsvField(lead.company || ''),
      escapeCsvField(lead.phone || ''),
      escapeCsvField(lead.message || ''),
      escapeCsvField(lead.status || ''),
      escapeCsvField(lead.createdAt ? lead.createdAt.toISOString() : ''),
    ].join(',')
  })

  return [header, ...rows].join('\n')
}
