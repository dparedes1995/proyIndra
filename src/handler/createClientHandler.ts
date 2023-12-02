import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createClientController } from '../controller/clientController'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => createClientController(event)
