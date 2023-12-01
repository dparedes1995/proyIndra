import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ClientService } from "../service/clientService";
import { handleError } from "../utils/errorUtils";
import {ClientEntity} from "../entities/clientEntity";
import {apiResponseUtils} from "../utils/apiResponseUtils";
import {HttpStatusEnum} from "../infrastructure/enums/httpStatusEnum";

const clientService:ClientService = new ClientService();

export const createClientController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const reqBody = JSON.parse(event.body as string);
        const client:ClientEntity = await clientService.createClient(reqBody);

        return apiResponseUtils(HttpStatusEnum.CREATED, client) as APIGatewayProxyResult;
    } catch (e) {
        return handleError(e);
    }
};

export const getClientController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const client:ClientEntity = await clientService.getClientById(event.pathParameters?.id as string);

        return apiResponseUtils(HttpStatusEnum.OK, client) as APIGatewayProxyResult;
    } catch (e) {
        return handleError(e);
    }
};
