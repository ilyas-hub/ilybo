import type { Request, Response, NextFunction } from 'express'
import { AppError, logger, ValidationError } from '../utils/index.js'
import { env } from '../config/index.js'

interface ErrorResponse {
  success: false
  error: {
    message: string
    status: string
    statusCode: number
    errors?: Record<string, string[]>
    stack?: string
  }
}

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void {
  logger.error(`${err.name}: ${err.message}`)

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        status: err.status,
        statusCode: err.statusCode,
        ...(err instanceof ValidationError && { errors: err.errors }),
        ...(env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    })
    return
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      status: 'error',
      statusCode: 500,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}
