import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedError, verifyToken } from '../utils/index.js'

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    req.user = {
      userId: decoded.userId,
      role: decoded.role as 'user' | 'admin',
    }

    next()
  } catch {
    next(new UnauthorizedError('Invalid token'))
  }
}
