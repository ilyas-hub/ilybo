import type { Request, Response, NextFunction } from 'express'
import * as authService from './auth.service.js'
import { sendSuccess, sendCreated, sendNoContent, setAuthCookies, clearAuthCookies } from '../../utils/index.js'

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { accessToken, refreshToken, ...result } = await authService.register(req.body)
    setAuthCookies(res, accessToken, refreshToken)
    sendCreated(res, result, 'Registration successful')
  } catch (error) {
    next(error)
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { accessToken, refreshToken, ...result } = await authService.login(req.body)
    setAuthCookies(res, accessToken, refreshToken)
    sendSuccess(res, result, 200, 'Login successful')
  } catch (error) {
    next(error)
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) {
      throw new Error('No refresh token')
    }
    const tokens = await authService.refresh(refreshToken)
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken)
    sendSuccess(res, { message: 'Tokens refreshed' })
  } catch (error) {
    next(error)
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await authService.logout(req.user!.userId)
    clearAuthCookies(res)
    sendNoContent(res)
  } catch (error) {
    next(error)
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await authService.getCurrentUser(req.user!.userId)
    sendSuccess(res, user)
  } catch (error) {
    next(error)
  }
}

export async function requestPasswordReset(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.requestPasswordReset(req.body)
    sendSuccess(res, result)
  } catch (error) {
    next(error)
  }
}

export async function verifyOTP(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.verifyOTP(req.body)
    sendSuccess(res, result)
  } catch (error) {
    next(error)
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.resetPassword(req.body)
    sendSuccess(res, result)
  } catch (error) {
    next(error)
  }
}
