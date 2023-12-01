import {ClientEntity} from "../entities/clientEntity";

export interface ClientServiceInterface {
    createClient(reqBody: Record<string, unknown>): Promise<ClientEntity>;
    getClientById(id: string): Promise<ClientEntity>;
}
