import { Router } from 'express'
import * as authController from './auth.controller.js'
import {
  validate,
  authMiddleware,
  authRateLimiter,
  passwordResetRateLimiter,
  otpVerifyRateLimiter,
} from '../../middlewares/index.js'
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  verifyOTPSchema,
  resetPasswordSchema,
} from './auth.validation.js'

const router = Router()

router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  authController.register
)

router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  authController.login
)

router.post('/refresh', authController.refresh)

router.post('/logout', authMiddleware, authController.logout)

router.get('/me', authMiddleware, authController.me)

// Password reset routes
router.post(
  '/password-reset/request',
  passwordResetRateLimiter,
  validate(requestPasswordResetSchema),
  authController.requestPasswordReset
)

router.post(
  '/password-reset/verify',
  otpVerifyRateLimiter,
  validate(verifyOTPSchema),
  authController.verifyOTP
)

router.post(
  '/password-reset/reset',
  otpVerifyRateLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
)

export const authRoutes = router
