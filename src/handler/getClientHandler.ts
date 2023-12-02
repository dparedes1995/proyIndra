import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getClientController } from '../controller/clientController'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => getClientController(event)
