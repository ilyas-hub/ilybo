import { Router } from 'express'
import * as authController from './auth.controller.js'
import { validate, authMiddleware, authRateLimiter } from '../../middlewares/index.js'
import { registerSchema, loginSchema, refreshSchema } from './auth.validation.js'

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

router.post('/refresh', validate(refreshSchema), authController.refresh)

router.post('/logout', authMiddleware, authController.logout)

router.get('/me', authMiddleware, authController.me)

export const authRoutes = router
