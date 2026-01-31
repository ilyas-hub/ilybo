import type { Request, Response, NextFunction } from 'express'
import * as authService from './auth.service.js'
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/index.js'

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.register(req.body)
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
    const result = await authService.login(req.body)
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
    const tokens = await authService.refresh(req.body.refreshToken)
    sendSuccess(res, tokens)
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
