import { APIGatewayProxyResult } from 'aws-lambda'
import { ErrorResponse } from 'aws-sdk/clients/migrationhubrefactorspaces'

import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'

const headers = {
  'Content-Type': 'application/json',
}

export const apiResponseUtils = <T>(
  statusCode: HttpStatusEnum,
  body: T
): APIGatewayProxyResult | ErrorResponse => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
})
