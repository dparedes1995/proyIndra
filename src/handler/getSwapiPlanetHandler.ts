import { APIGatewayProxyResult } from 'aws-lambda'
import { swapiPlanetController } from '../controller/swapiPlanetController'

export const handler = async (): Promise<APIGatewayProxyResult> =>
  swapiPlanetController()
