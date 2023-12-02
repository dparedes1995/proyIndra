import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'
import { APIGatewayProxyResult } from 'aws-lambda'
import { ErrorResponse } from 'aws-sdk/clients/migrationhubrefactorspaces'

const headers = {
  'content-type': 'application/json',
}
export const apiResponseUtils = <T>(
  statusCode: HttpStatusEnum,
  body: T
): APIGatewayProxyResult | ErrorResponse => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
})
