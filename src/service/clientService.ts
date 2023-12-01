import * as yup from "yup";
import { v4 } from "uuid";
import { HttpError } from "../utils/errorUtils";
import { ClientServiceInterface } from "../interfaces/clientInterfaces";
import {getItem, putItem} from "../gateway/dynamoGateway";
import {ClientEntity} from "../entities/clientEntity";
import {HttpStatusEnum} from "../infrastructure/enums/httpStatusEnum";

const tableName = "ClientTable";

const clientSchema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
});

export class ClientService implements ClientServiceInterface {
    public async createClient(reqBody: Record<string, unknown>): Promise<ClientEntity> {
        await clientSchema.validate(reqBody, { abortEarly: false });

        const client: ClientEntity = {
            ...reqBody,
            clientID: v4(),
        };

        await putItem({
            TableName: tableName,
            Item: client,
        });

        return client;
    }

    public async getClientById(id: string): Promise<ClientEntity> {
        const entity:ClientEntity | undefined = await getItem<ClientEntity>({
            TableName: tableName,
            Key: {
                clientID: id,
            },
        });

        if (!entity) {
            throw new HttpError(HttpStatusEnum.BAD_REQUEST, { error: "Not Found Client" });
        }

        return entity;
    }
}
