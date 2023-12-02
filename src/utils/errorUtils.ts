import * as yup from 'yup'
import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'
import { apiResponseUtils } from './apiResponseUtils'

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    body: Record<string, unknown> = {}
  ) {
    super(JSON.stringify(body))
  }
}

interface ErrorResponse {
  statusCode: number
  headers: Record<string, string>
  body: string
}

/**
 * Handles errors and returns an ErrorResponse.
 * @param error - The error object.
 * @returns The ErrorResponse object.
 * @throws The original error if it doesn't match any of the conditions.
 */
export const handleError = (error: unknown): ErrorResponse => {
  if (yup.ValidationError.isError(error)) {
    return apiResponseUtils(HttpStatusEnum.BAD_REQUEST, {
      errors: error.errors,
    }) as ErrorResponse
  }

  if (error instanceof SyntaxError) {
    return apiResponseUtils(HttpStatusEnum.BAD_REQUEST, {
      error: `Invalid request body format: "${error.message}"`,
    }) as ErrorResponse
  }

  if (error instanceof HttpError) {
    return apiResponseUtils(error.statusCode, error.message) as ErrorResponse
  }

  throw error
}
