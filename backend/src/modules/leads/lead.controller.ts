import type { Request, Response, NextFunction } from 'express'
import * as leadService from './lead.service.js'
import type { LeadStatus } from './lead.model.js'
import { sendSuccess, sendCreated, sendPaginated, sendNoContent } from '../../utils/index.js'

export async function getLeads(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const status = req.query.status as LeadStatus | undefined

    const { leads, total } = await leadService.findAllLeads(page, limit, status)
    sendPaginated(res, leads, page, limit, total)
  } catch (error) {
    next(error)
  }
}

export async function getLead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const lead = await leadService.findLeadById(req.params.id)
    sendSuccess(res, lead)
  } catch (error) {
    next(error)
  }
}

export async function createLead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const lead = await leadService.createLead(req.body)
    sendCreated(res, lead, 'Thank you for your message!')
  } catch (error) {
    next(error)
  }
}

export async function updateLead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body)
    sendSuccess(res, lead)
  } catch (error) {
    next(error)
  }
}

export async function deleteLead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await leadService.deleteLead(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}

export async function getLeadStats(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const stats = await leadService.getLeadStats()
    sendSuccess(res, stats)
  } catch (error) {
    next(error)
  }
}
