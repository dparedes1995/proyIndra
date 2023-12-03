import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createClientController } from '../controller/clientController'

/**
 * Handles the create client request.
 *
 * @param event - The API Gateway proxy event.
 * @returns A promise that resolves to the API Gateway proxy result.
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => createClientController(event)
