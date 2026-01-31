import { Project, type IProject, type ProjectStatus } from './project.model.js'
import { Lead } from '../leads/lead.model.js'
import { NotFoundError } from '../../utils/index.js'
import type { CreateProjectInput, UpdateProjectInput, CreateFromLeadInput } from './project.validation.js'

export async function findAllProjects(
  page = 1,
  limit = 10,
  status?: ProjectStatus
): Promise<{ projects: IProject[]; total: number }> {
  const skip = (page - 1) * limit
  const query = status ? { status } : {}

  const [projects, total] = await Promise.all([
    Project.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Project.countDocuments(query),
  ])

  return { projects, total }
}

export async function findProjectById(id: string): Promise<IProject> {
  const project = await Project.findById(id)
  if (!project) {
    throw new NotFoundError('Project not found')
  }
  return project
}

export async function createProject(
  data: CreateProjectInput,
  userId: string
): Promise<IProject> {
  const project = await Project.create({
    ...data,
    createdBy: userId,
  })
  return project
}

export async function createProjectFromLead(
  leadId: string,
  data: CreateFromLeadInput,
  userId: string
): Promise<IProject> {
  const lead = await Lead.findById(leadId)
  if (!lead) {
    throw new NotFoundError('Lead not found')
  }

  const project = await Project.create({
    name: data.name || `Project for ${lead.name}`,
    description: data.description || lead.message,
    leadId: lead._id,
    clientName: lead.name,
    clientEmail: lead.email,
    clientCompany: lead.company,
    serviceType: data.serviceType || 'General',
    budget: data.budget,
    startDate: data.startDate,
    endDate: data.endDate,
    createdBy: userId,
  })

  // Update lead status to converted
  await Lead.findByIdAndUpdate(leadId, { status: 'converted' })

  return project
}

export async function updateProject(
  id: string,
  data: UpdateProjectInput
): Promise<IProject> {
  const project = await Project.findByIdAndUpdate(id, data, { new: true })
  if (!project) {
    throw new NotFoundError('Project not found')
  }
  return project
}

export async function deleteProject(id: string): Promise<void> {
  const project = await Project.findByIdAndDelete(id)
  if (!project) {
    throw new NotFoundError('Project not found')
  }
}

export async function getProjectStats(): Promise<{
  total: number
  byStatus: Record<ProjectStatus, number>
}> {
  const stats = await Project.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])

  const byStatus: Record<ProjectStatus, number> = {
    planning: 0,
    in_progress: 0,
    on_hold: 0,
    completed: 0,
    cancelled: 0,
  }

  let total = 0
  for (const stat of stats) {
    byStatus[stat._id as ProjectStatus] = stat.count
    total += stat.count
  }

  return { total, byStatus }
}
