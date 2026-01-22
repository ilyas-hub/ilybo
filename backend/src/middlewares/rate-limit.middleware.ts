import rateLimit from 'express-rate-limit'
import { RATE_LIMIT, AUTH_RATE_LIMIT } from '../config/index.js'

export const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT.windowMs,
  max: RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests, please try again later',
      status: 'fail',
      statusCode: 429,
    },
  },
})

export const authRateLimiter = rateLimit({
  windowMs: AUTH_RATE_LIMIT.windowMs,
  max: AUTH_RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many login attempts, please try again later',
      status: 'fail',
      statusCode: 429,
    },
  },
})
