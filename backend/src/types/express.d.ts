import type { UserRole } from '../config/constants.js'

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        role: UserRole
      }
    }
  }
}

export {}
