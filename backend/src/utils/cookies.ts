import type { Response, CookieOptions } from 'express'
import { env } from '../config/index.js'

const isProduction = env.NODE_ENV === 'production'

const BASE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'strict' : 'lax',
  path: '/',
}

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
): void {
  res.cookie('accessToken', accessToken, {
    ...BASE_OPTIONS,
    maxAge: 15 * 60 * 1000, // 15 minutes
  })

  res.cookie('refreshToken', refreshToken, {
    ...BASE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/v1/auth', // Only sent to auth endpoints
  })
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie('accessToken', { ...BASE_OPTIONS })
  res.clearCookie('refreshToken', { ...BASE_OPTIONS, path: '/api/v1/auth' })
}
