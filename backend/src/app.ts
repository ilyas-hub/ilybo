import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import mongoose from 'mongoose'

import { env, API_PREFIX } from './config/index.js'
import { errorMiddleware, rateLimiter } from './middlewares/index.js'
import { authRoutes } from './modules/auth/index.js'
import { userRoutes } from './modules/users/index.js'
import { serviceRoutes } from './modules/services/index.js'
import { leadRoutes } from './modules/leads/index.js'
import { projectRoutes } from './modules/projects/index.js'
import { settingsRoutes } from './modules/settings/index.js'
import { pageRoutes } from './modules/pages/index.js'
import { portfolioProjectRoutes } from './modules/portfolio-projects/index.js'
import { faqRoutes } from './modules/faqs/index.js'
import { testimonialRoutes } from './modules/testimonials/index.js'

// Custom MongoDB sanitization for Express 5.x compatibility
// Note: express-mongo-sanitize and hpp are not compatible with Express 5.x (req.query is read-only)
function sanitizeObject(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject)
  }

  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    // Remove keys starting with $ or containing .
    if (key.startsWith('$') || key.includes('.')) {
      continue
    }
    sanitized[key] = sanitizeObject(value)
  }
  return sanitized
}

function mongoSanitizeMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeObject(req.body)
  }
  if (req.params) {
    // params is mutable in Express 5.x
    const sanitizedParams = sanitizeObject(req.params) as Record<string, string>
    for (const key of Object.keys(req.params)) {
      if (!(key in sanitizedParams)) {
        delete req.params[key]
      }
    }
  }
  next()
}

export function createApp(): Express {
  const app = express()

  // Security middlewares
  app.use(helmet())
  app.use(
    cors({
      origin: env.CORS_ORIGINS.split(','),
      credentials: true,
    })
  )

  // Rate limiting
  app.use(rateLimiter)

  // Body parsing
  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ extended: true, limit: '10kb' }))

  // MongoDB sanitization (after body parsing)
  app.use(mongoSanitizeMiddleware)

  // Compression
  app.use(compression())

  // Health check routes
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
    })
  })

  app.get('/health/db', async (_req: Request, res: Response) => {
    try {
      const state = mongoose.connection.readyState
      const states: Record<number, string> = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
      }

      if (state === 1) {
        res.status(200).json({
          success: true,
          status: 'connected',
          database: mongoose.connection.name,
        })
      } else {
        res.status(503).json({
          success: false,
          status: states[state] || 'unknown',
        })
      }
    } catch {
      res.status(503).json({
        success: false,
        status: 'error',
      })
    }
  })

  // API routes
  app.use(`${API_PREFIX}/auth`, authRoutes)
  app.use(`${API_PREFIX}/users`, userRoutes)
  app.use(`${API_PREFIX}/services`, serviceRoutes)
  app.use(`${API_PREFIX}/leads`, leadRoutes)
  app.use(`${API_PREFIX}/projects`, projectRoutes)
  app.use(`${API_PREFIX}/settings`, settingsRoutes)
  app.use(`${API_PREFIX}/pages`, pageRoutes)
  app.use(`${API_PREFIX}/portfolio-projects`, portfolioProjectRoutes)
  app.use(`${API_PREFIX}/faqs`, faqRoutes)
  app.use(`${API_PREFIX}/testimonials`, testimonialRoutes)

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        message: 'Not found',
        status: 'fail',
        statusCode: 404,
      },
    })
  })

  // Error handler
  app.use(errorMiddleware)

  return app
}
