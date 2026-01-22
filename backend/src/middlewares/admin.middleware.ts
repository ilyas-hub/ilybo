import type { Request, Response, NextFunction } from 'express'
import { ForbiddenError, UnauthorizedError } from '../utils/index.js'
import { USER_ROLES } from '../config/index.js'

export function adminMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required'))
  }

  if (req.user.role !== USER_ROLES.ADMIN) {
    return next(new ForbiddenError('Admin access required'))
  }

  next()
}
