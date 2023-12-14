import { APIGatewayProxyResult } from 'aws-lambda'
import { apiResponseUtils } from '../utils/apiResponseUtils'
import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'
import { handleError } from '../utils/errorUtils'
import { SwapiPlanetService } from '../service/swapiPlanetService'
import { SwapiPlanetInterfaces } from '../interfaces/swapiPlanetInterfaces'

const swapiPlanetService: SwapiPlanetInterfaces = new SwapiPlanetService()
/**
 * Retrieves a SWAPI planet and returns the result as an APIGatewayProxyResult.
 * @returns A Promise that resolves to an APIGatewayProxyResult.
 */
export const swapiPlanetController =
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const swapiPlanet: Record<string, string> =
        await swapiPlanetService.getSwapiPlanet()

      return apiResponseUtils(
        HttpStatusEnum.OK,
        swapiPlanet
      ) as APIGatewayProxyResult
    } catch (error) {
      return handleError(error)
    }
  }
