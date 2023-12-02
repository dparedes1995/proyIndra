import { APIGatewayProxyResult } from 'aws-lambda'
import { apiResponseUtils } from '../utils/apiResponseUtils'
import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'
import { handleError } from '../utils/errorUtils'
import { SwapiPlanetService } from '../service/swapiPlanetService'

const swapiPlanetService: SwapiPlanetService = new SwapiPlanetService()
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
