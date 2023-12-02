import { APIGatewayProxyResult } from 'aws-lambda'
import { swapiPlanetController } from '../controller/swapiPlanetController'

/**
 * Retrieves a SWAPI planet using the swapiPlanetController.
 * @returns {Promise<APIGatewayProxyResult>} The result of the API Gateway proxy.
 */
export const handler = async (): Promise<APIGatewayProxyResult> =>
  swapiPlanetController()
