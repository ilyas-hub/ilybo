import type { Request, Response, NextFunction } from 'express'
import * as userService from './user.service.js'
import { sendSuccess, sendPaginated, sendNoContent } from '../../utils/index.js'

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const { users, total } = await userService.findAllUsers(page, limit)
    sendPaginated(res, users, page, limit, total)
  } catch (error) {
    next(error)
  }
}

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await userService.findUserById(req.params.id)
    sendSuccess(res, user)
  } catch (error) {
    next(error)
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    sendSuccess(res, user)
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await userService.deleteUser(req.params.id)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}
