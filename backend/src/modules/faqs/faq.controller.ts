import type { Request, Response, NextFunction } from 'express'
import * as faqService from './faq.service.js'
import { sendSuccess, sendPaginated, sendCreated, sendNoContent } from '../../utils/index.js'

export async function getActiveFAQs(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const faqs = await faqService.findActiveFAQs()
    sendSuccess(res, faqs)
  } catch (error) {
    next(error)
  }
}

export async function getAllFAQs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const { faqs, total } = await faqService.findAllFAQs(page, limit)
    sendPaginated(res, faqs, page, limit, total)
  } catch (error) {
    next(error)
  }
}

export async function createFAQ(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const faq = await faqService.createFAQ(req.body)
    sendCreated(res, faq)
  } catch (error) {
    next(error)
  }
}

export async function updateFAQ(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const faq = await faqService.updateFAQ(req.params.id, req.body)
    sendSuccess(res, faq)
  } catch (error) {
    next(error)
  }
}

export async function deleteFAQ(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await faqService.deleteFAQ(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}
