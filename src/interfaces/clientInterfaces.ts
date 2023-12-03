import { ClientEntity } from '../models/clientEntity'

/**
 * Interface for the ClientService.
 */
export interface ClientServiceInterface {
  /**
   * Creates a client.
   * @param reqBody - The request body.
   * @returns A promise that resolves to a ClientEntity.
   */
  createClient(reqBody: Record<string, unknown>): Promise<ClientEntity>

  /**
   * Retrieves a client by its ID.
   * @param id - The ID of the client.
   * @returns A promise that resolves to a ClientEntity.
   */
  getClientById(id: string): Promise<ClientEntity>
}
export interface ClientServiceInterface {
  createClient(reqBody: Record<string, unknown>): Promise<ClientEntity>
  getClientById(id: string): Promise<ClientEntity>
}
