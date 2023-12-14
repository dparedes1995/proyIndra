import { v4 as uuidv4 } from 'uuid'
import { HttpError } from '../utils/errorUtils'
import { ClientServiceInterface } from '../interfaces/clientInterfaces'
import { getItem, putItem } from '../gateway/dynamoGateway'
import { Client } from '../models/client'
import { HttpStatusEnum } from '../infrastructure/enums/httpStatusEnum'
import { clientSchema } from '../utils/utils'
import { Tables } from '../infrastructure/Tables'

const tableName = Tables.CLIENT_TABLE

/**
 * Implementation of the client service interface.
 * Provides operations to create and retrieve clients.
 * @implements {ClientServiceInterface}
 */
/**
 * Service class for managing clients.
 */
export class ClientService implements ClientServiceInterface {
  /**
   * Creates a new client in the database.
   * @param {Record<string, unknown>} reqBody - Request body containing client information.
   * @returns {Promise<Client>} - Promise resolving with the created client entity.
   * @throws {HttpError} - HTTP error if validation fails or there is an issue with the database.
   */
  public async createClient(
    reqBody: Record<string, unknown>
  ): Promise<Client> {
    await clientSchema.validate(reqBody, { abortEarly: false })

    const client: Client = {
      ...reqBody,
      clientID: uuidv4(),
    }

    await putItem({
      TableName: tableName,
      Item: client,
    })

    return client
  }

  /**
   * Gets the entity of a client by its ID.
   * @param {string} id - ID of the client to retrieve.
   * @returns {Promise<Client>} - Promise resolving with the client entity.
   * @throws {HttpError} - HTTP error if the client is not found in the database.
   */
  public async getClientById(id: string): Promise<Client> {
    const entity: Client | undefined = await getItem<Client>({
      TableName: tableName,
      Key: {
        clientID: id,
      },
    })

    if (!entity) {
      throw new HttpError(HttpStatusEnum.NOT_FOUND, {
        error: 'Not Found Client',
      })
    }

    return entity
  }
}
