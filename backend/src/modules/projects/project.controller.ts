import type { Request, Response, NextFunction } from 'express'
import * as projectService from './project.service.js'
import type { ProjectStatus } from './project.model.js'
import { sendSuccess, sendCreated, sendPaginated, sendNoContent } from '../../utils/index.js'

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const status = req.query.status as ProjectStatus | undefined

    const { projects, total } = await projectService.findAllProjects(page, limit, status)
    sendPaginated(res, projects, page, limit, total)
  } catch (error) {
    next(error)
  }
}

export async function getProject(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.findProjectById(req.params.id)
    sendSuccess(res, project)
  } catch (error) {
    next(error)
  }
}

export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.createProject(req.body, req.user!.userId)
    sendCreated(res, project, 'Project created successfully')
  } catch (error) {
    next(error)
  }
}

export async function createFromLead(
  req: Request<{ leadId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.createProjectFromLead(
      req.params.leadId,
      req.body,
      req.user!.userId
    )
    sendCreated(res, project, 'Project created from lead successfully')
  } catch (error) {
    next(error)
  }
}

export async function updateProject(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.updateProject(req.params.id, req.body)
    sendSuccess(res, project)
  } catch (error) {
    next(error)
  }
}

export async function deleteProject(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await projectService.deleteProject(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}

export async function getProjectStats(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const stats = await projectService.getProjectStats()
    sendSuccess(res, stats)
  } catch (error) {
    next(error)
  }
}
