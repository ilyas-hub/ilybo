export const API_PREFIX = '/api/v1'

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window
}

export const AUTH_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // requests per window
}

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
