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

export const handleError = (e: unknown): ErrorResponse => {
  if (yup.ValidationError.isError(e)) {
    return apiResponseUtils(HttpStatusEnum.BAD_REQUEST, {
      errors: e.errors,
    }) as ErrorResponse
  }

  if (e instanceof SyntaxError) {
    return apiResponseUtils(HttpStatusEnum.BAD_REQUEST, {
      error: `invalid request body format : "${e.message}"`,
    }) as ErrorResponse
  }

  if (e instanceof HttpError) {
    return apiResponseUtils(e.statusCode, e.message) as ErrorResponse
  }

  throw e
}
