import rateLimit from 'express-rate-limit'
import {
  RATE_LIMIT,
  AUTH_RATE_LIMIT,
  PASSWORD_RESET_RATE_LIMIT,
  OTP_VERIFY_RATE_LIMIT,
} from '../config/index.js'

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

export const passwordResetRateLimiter = rateLimit({
  windowMs: PASSWORD_RESET_RATE_LIMIT.windowMs,
  max: PASSWORD_RESET_RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many password reset requests, please try again later',
      status: 'fail',
      statusCode: 429,
    },
  },
})

export const otpVerifyRateLimiter = rateLimit({
  windowMs: OTP_VERIFY_RATE_LIMIT.windowMs,
  max: OTP_VERIFY_RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many verification attempts, please try again later',
      status: 'fail',
      statusCode: 429,
    },
  },
})

export const leadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 submissions per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many submissions, please try again later',
      status: 'fail',
      statusCode: 429,
    },
  },
})
