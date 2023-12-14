import { Client } from '../models/client'

/**
 * Interface for the ClientService.
 */
export interface ClientInterface {
  /**
   * Creates a client.
   * @param reqBody - The request body.
   * @returns A promise that resolves to a ClientEntity.
   */
  createClient(reqBody: Record<string, unknown>): Promise<Client>

  /**
   * Retrieves a client by its ID.
   * @param id - The ID of the client.
   * @returns A promise that resolves to a ClientEntity.
   */
  getClientById(id: string): Promise<Client>
}
