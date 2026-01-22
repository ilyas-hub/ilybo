import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema, ZodError } from 'zod'
import { ValidationError } from '../utils/index.js'

type ValidationTarget = 'body' | 'params' | 'query'

export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req[target])
      next()
    } catch (err) {
      const zodError = err as ZodError
      const errors: Record<string, string[]> = {}

      zodError.errors.forEach((error) => {
        const path = error.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(error.message)
      })

      next(new ValidationError('Validation failed', errors))
    }
  }
}
