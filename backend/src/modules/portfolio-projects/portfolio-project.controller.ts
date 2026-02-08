import type { Request, Response, NextFunction } from 'express'
import * as portfolioProjectService from './portfolio-project.service.js'
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/index.js'

// Public

export async function getPublicProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const category = req.query.category as string | undefined
    const projects = await portfolioProjectService.findPublishedProjects(category)
    sendSuccess(res, projects)
  } catch (error) {
    next(error)
  }
}

export async function getPublicProjectBySlug(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await portfolioProjectService.findBySlug(req.params.slug)
    sendSuccess(res, project)
  } catch (error) {
    next(error)
  }
}

// Admin

export async function getAllProjects(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projects = await portfolioProjectService.findAllProjects()
    sendSuccess(res, projects)
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
    const project = await portfolioProjectService.createProject(req.body, req.user!.userId)
    sendCreated(res, project)
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
    const project = await portfolioProjectService.updateProject(req.params.id, req.body)
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
    await portfolioProjectService.deleteProject(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}

export async function togglePublish(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const project = await portfolioProjectService.togglePublish(req.params.id)
    sendSuccess(res, project, 200, `Project ${project.isPublished ? 'published' : 'unpublished'}`)
  } catch (error) {
    next(error)
  }
}
