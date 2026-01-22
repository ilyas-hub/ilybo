import type { Response } from 'express'

interface SuccessResponse<T> {
  success: true
  data: T
  message?: string
}

interface PaginatedResponse<T> {
  success: true
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string
): Response<SuccessResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(message && { message }),
  })
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number
): Response<PaginatedResponse<T>> {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}

export function sendCreated<T>(
  res: Response,
  data: T,
  message = 'Created successfully'
): Response<SuccessResponse<T>> {
  return sendSuccess(res, data, 201, message)
}

export function sendNoContent(res: Response): Response {
  return res.status(204).send()
}
