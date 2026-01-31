import type { Request, Response, NextFunction } from 'express'
import * as settingsService from './settings.service.js'
import { sendSuccess } from '../../utils/index.js'

export async function getSettings(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await settingsService.getSettings()
    sendSuccess(res, settings)
  } catch (error) {
    next(error)
  }
}

export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await settingsService.updateSettings(req.body, req.user!.userId)
    sendSuccess(res, settings, 200, 'Settings updated successfully')
  } catch (error) {
    next(error)
  }
}
