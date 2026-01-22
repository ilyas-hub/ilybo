import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import mongoose from 'mongoose'

import { env, API_PREFIX } from './config/index.js'
import { errorMiddleware, rateLimiter } from './middlewares/index.js'
import { authRoutes } from './modules/auth/index.js'
import { userRoutes } from './modules/users/index.js'
import { serviceRoutes } from './modules/services/index.js'
import { leadRoutes } from './modules/leads/index.js'

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
  app.use(mongoSanitize())
  app.use(hpp())

  // Rate limiting
  app.use(rateLimiter)

  // Body parsing
  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ extended: true, limit: '10kb' }))

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
