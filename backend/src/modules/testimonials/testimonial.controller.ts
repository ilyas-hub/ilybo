import type { Request, Response, NextFunction } from 'express'
import * as testimonialService from './testimonial.service.js'
import { sendSuccess, sendPaginated, sendCreated, sendNoContent } from '../../utils/index.js'

export async function getActiveTestimonials(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const testimonials = await testimonialService.findActiveTestimonials()
    sendSuccess(res, testimonials)
  } catch (error) {
    next(error)
  }
}

export async function getAllTestimonials(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const { testimonials, total } = await testimonialService.findAllTestimonials(page, limit)
    sendPaginated(res, testimonials, page, limit, total)
  } catch (error) {
    next(error)
  }
}

export async function createTestimonial(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body)
    sendCreated(res, testimonial)
  } catch (error) {
    next(error)
  }
}

export async function updateTestimonial(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body)
    sendSuccess(res, testimonial)
  } catch (error) {
    next(error)
  }
}

export async function deleteTestimonial(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await testimonialService.deleteTestimonial(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}
