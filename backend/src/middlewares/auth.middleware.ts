import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedError, verifyToken } from '../utils/index.js'

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    // Try httpOnly cookie first, then fall back to Authorization header
    let token = req.cookies?.accessToken

    if (!token) {
      const authHeader = req.headers.authorization
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
      }
    }

    if (!token) {
      throw new UnauthorizedError('No token provided')
    }

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
