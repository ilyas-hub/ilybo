import type { Request, Response, NextFunction } from 'express'
import * as pageService from './page.service.js'
import type { PageStatus } from './page.model.js'
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/index.js'

// Public endpoints
export async function getPageBySlug(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = await pageService.findPageBySlug(req.params.slug)
    sendSuccess(res, page)
  } catch (error) {
    next(error)
  }
}

// Admin endpoints
export async function getPages(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const status = req.query.status as PageStatus | undefined
    const pages = await pageService.findAllPages(status)
    sendSuccess(res, pages)
  } catch (error) {
    next(error)
  }
}

export async function getPage(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = await pageService.findPageById(req.params.id)
    sendSuccess(res, page)
  } catch (error) {
    next(error)
  }
}

export async function createPage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = await pageService.createPage(req.body, req.user!.userId)
    sendCreated(res, page, 'Page created successfully')
  } catch (error) {
    next(error)
  }
}

export async function updatePage(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = await pageService.updatePage(req.params.id, req.body, req.user!.userId)
    sendSuccess(res, page, 200, 'Page updated successfully')
  } catch (error) {
    next(error)
  }
}

export async function deletePage(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await pageService.deletePage(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}

export async function publishPage(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = await pageService.publishPage(req.params.id)
    sendSuccess(res, page, 200, 'Page published successfully')
  } catch (error) {
    next(error)
  }
}

export async function getVersionHistory(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const versions = await pageService.getVersionHistory(req.params.id)
    sendSuccess(res, versions)
  } catch (error) {
    next(error)
  }
}

export async function revertToVersion(
  req: Request<{ id: string; version: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const version = parseInt(req.params.version)
    const page = await pageService.revertToVersion(req.params.id, version, req.user!.userId)
    sendSuccess(res, page, 200, 'Page reverted successfully')
  } catch (error) {
    next(error)
  }
}
