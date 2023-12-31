import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ClientService } from '../service/clientService'
import { handleError } from '../utils/errorUtils'
import { Client } from '../models/client'
import { apiResponseUtils } from '../utils/apiResponseUtils'
import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'
import { get } from 'lodash'
import { ClientInterface } from '../interfaces/clientInterfaces'

const clientService: ClientInterface = new ClientService();

/**
 * Creates a client controller.
 *
 * @param event - The API Gateway proxy event.
 * @returns A promise that resolves to an API Gateway proxy result.
 */
export const createClientController = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string)
    const client: Client = await clientService.createClient(reqBody)

    return apiResponseUtils(
      HttpStatusEnum.CREATED,
      client
    ) as APIGatewayProxyResult
  } catch (e) {
    return handleError(e)
  }
}

/**
 * Retrieves a client by ID.
 *
 * @param event - The API Gateway event object.
 * @returns A promise that resolves to an API Gateway proxy result.
 */
export const getClientController = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const client: Client = await clientService.getClientById(
      get(event.pathParameters, 'id') as string
    )

    return apiResponseUtils(HttpStatusEnum.OK, client) as APIGatewayProxyResult
  } catch (e) {
    return handleError(e)
  }
}
