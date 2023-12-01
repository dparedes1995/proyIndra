import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {ClientEntity} from "../../src/entities/clientEntity";
import {HttpStatusEnum} from "../../src/infrastructure/enums/httpStatusEnum";
import mocked = jest.mocked;
import {ClientService} from "../../src/service/clientService";
import {apiResponseUtils} from "../../src/utils/apiResponseUtils";
import {createClientController, getClientController} from "../../src/controller/clientController";
import {HttpError} from "../../src/utils/errorUtils";

jest.mock("../../src/service/clientService");
jest.mock("../../src/utils/apiResponseUtils");


describe("createClientController", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("should create a new client and return 201 response", async () => {
        const mockEvent: APIGatewayProxyEvent = {
            body: '{"name": "John", "lastName": "Doe", "email": "john.doe@example.com", "phone": "1234567890", "address": "123 Main St"}',
            pathParameters: {},
        } as unknown as APIGatewayProxyEvent;

        const mockClient: ClientEntity = {
            clientID: "12345",
            name: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            address: "123 Main St",
        };

        const mockApiResponse = {
            statusCode: HttpStatusEnum.CREATED,
            body: JSON.stringify(mockClient),
        };

        mocked(ClientService.prototype.createClient).mockResolvedValue(mockClient);
        mocked(apiResponseUtils).mockReturnValue(mockApiResponse);

        const result = await createClientController(mockEvent);

        expect(ClientService.prototype.createClient).toHaveBeenCalledWith(expect.objectContaining({
            name: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            address: "123 Main St",
        }));
        expect(apiResponseUtils).toHaveBeenCalledWith(HttpStatusEnum.CREATED, mockClient);
        expect(result).toEqual(mockApiResponse);
    });

    test("should handle invalid request body and return 400 response", async () => {
        const mockEvent: APIGatewayProxyEvent = {
            body: '{"invalid_json"',
            pathParameters: {},
        } as APIGatewayProxyEvent;

        const mockError = {"error": "invalid request body format : \"Unexpected end of JSON input\""};
        const mockApiResponse = {
            statusCode: HttpStatusEnum.BAD_REQUEST,
            body: JSON.stringify({ errors: ["Invalid Request Body"] }),
        };

        mocked(ClientService.prototype.createClient).mockRejectedValue(mockError);
        mocked(apiResponseUtils).mockReturnValue(mockApiResponse);

        const result = await createClientController(mockEvent);

        expect(apiResponseUtils).toHaveBeenCalledWith(HttpStatusEnum.BAD_REQUEST, mockError);
        expect(result).toEqual(mockApiResponse);
    });
});

describe("getClientController", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("should get a client by ID and return 200 response", async () => {
        const mockEvent: APIGatewayProxyEvent = {
            pathParameters: { id: "12345" },
        } as unknown as APIGatewayProxyEvent;

        const mockClient: ClientEntity = {
            clientID: "12345",
            name: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            address: "123 Main St",
        };

        const mockApiResponse = {
            statusCode: HttpStatusEnum.OK,
            body: JSON.stringify(mockClient),
        };

        mocked(ClientService.prototype.getClientById).mockResolvedValue(mockClient);
        mocked(apiResponseUtils).mockReturnValue(mockApiResponse);

        const result:APIGatewayProxyResult = await getClientController(mockEvent);

        expect(ClientService.prototype.getClientById).toHaveBeenCalledWith("12345");
        expect(apiResponseUtils).toHaveBeenCalledWith(HttpStatusEnum.OK, mockClient);
        expect(result).toEqual(mockApiResponse);
    });

    test("should handle error when client is not found and return 404 response", async () => {
        const mockEvent: APIGatewayProxyEvent = {
            pathParameters: { id: "12345" },
        } as unknown as APIGatewayProxyEvent;

        const mockError:HttpError = new HttpError(HttpStatusEnum.NOT_FOUND, { error: "Not Found Client" });
        const mockErrorResponse ="{\"error\":\"Not Found Client\"}";
        const mockApiResponse = {
            statusCode: HttpStatusEnum.NOT_FOUND,
            body: JSON.stringify({ error: "Not Found Client" }),
        };

        mocked(ClientService.prototype.getClientById).mockRejectedValue(mockError);
        mocked(apiResponseUtils).mockReturnValue(mockApiResponse);

        const result = await getClientController(mockEvent);

        expect(apiResponseUtils).toHaveBeenCalledWith(HttpStatusEnum.NOT_FOUND, mockErrorResponse);
        expect(result).toEqual(mockApiResponse);
    });

});
