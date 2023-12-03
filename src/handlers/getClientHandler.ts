import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getClientController } from '../controller/clientController'

/**
 * Handles the API Gateway event and returns the result of the getClientController function.
 * @param event The API Gateway event.
 * @returns A promise that resolves to the API Gateway proxy result.
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => getClientController(event)
