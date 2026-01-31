import type { Request, Response, NextFunction } from 'express'
import * as serviceService from './service.service.js'
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/index.js'

export async function getServices(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const onlyActive = req.query.all !== 'true'
    const services = await serviceService.findAllServices(onlyActive)
    sendSuccess(res, services)
  } catch (error) {
    next(error)
  }
}

export async function getService(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = await serviceService.findServiceBySlug(req.params.slug)
    sendSuccess(res, service)
  } catch (error) {
    next(error)
  }
}

export async function createService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = await serviceService.createService(req.body)
    sendCreated(res, service)
  } catch (error) {
    next(error)
  }
}

export async function updateService(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = await serviceService.updateService(req.params.id, req.body)
    sendSuccess(res, service)
  } catch (error) {
    next(error)
  }
}

export async function deleteService(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await serviceService.deleteService(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}
