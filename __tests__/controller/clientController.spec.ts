import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ClientEntity } from '../../src/models/clientEntity'
import { HttpStatusEnum } from '../../src/infrastructure/enums/httpStatusEnum'
import mocked = jest.mocked
import { ClientService } from '../../src/service/clientService'
import { apiResponseUtils } from '../../src/utils/apiResponseUtils'
import {
  createClientController,
  getClientController,
} from '../../src/controller/clientController'
import { HttpError } from '../../src/utils/errorUtils'

jest.mock('../../src/service/clientService')
jest.mock('../../src/utils/apiResponseUtils')

describe('createClientController', () => {
  let mockEvent: APIGatewayProxyEvent
  let mockClient: ClientEntity
  let mockApiResponse: APIGatewayProxyResult

  beforeEach(() => {
    jest.resetAllMocks()

    mockEvent = {
      body: JSON.stringify({
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
      }),
      pathParameters: {},
    } as unknown as APIGatewayProxyEvent

    mockClient = {
      clientID: '12345',
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
    }

    mockApiResponse = {
      statusCode: HttpStatusEnum.CREATED,
      body: JSON.stringify(mockClient),
    }
  })

  test('should create a new client and return 201 response', async () => {
    mocked(ClientService.prototype.createClient).mockResolvedValue(mockClient)
    mocked(apiResponseUtils).mockReturnValue(mockApiResponse)

    const result = await createClientController(mockEvent)

    expect(ClientService.prototype.createClient).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
      })
    )
    expect(apiResponseUtils).toHaveBeenCalledWith(
      HttpStatusEnum.CREATED,
      mockClient
    )
    expect(result).toEqual(mockApiResponse)
  })
  test('should return 400 response when event body is missing', async () => {
    const mockEvent: APIGatewayProxyEvent = {
      body: null,
      pathParameters: {},
    } as unknown as APIGatewayProxyEvent

    const mockError = new HttpError(HttpStatusEnum.BAD_REQUEST, {
      error: 'Invalid request body',
    })
    const mockApiResponse = {
      statusCode: HttpStatusEnum.BAD_REQUEST,
      body: JSON.stringify(mockError),
    }

    mocked(apiResponseUtils).mockReturnValue(mockApiResponse)

    try {
      await createClientController(mockEvent)
    } catch (error) {
      expect(ClientService.prototype.createClient).not.toHaveBeenCalled()
      expect(apiResponseUtils).toHaveBeenCalledWith(
        HttpStatusEnum.BAD_REQUEST,
        { error: 'Invalid request body' }
      )
      expect(error).toEqual(mockApiResponse)
    }
  })

  test('should return 500 response when createClient throws an error', async () => {
    const mockError = new HttpError(HttpStatusEnum.INTERNAL_SERVER_ERROR, {
      error: 'Internal Server Error',
    })
    const mockApiResponse = {
      statusCode: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(mockError),
    }

    mocked(ClientService.prototype.createClient).mockRejectedValue(mockError)
    mocked(apiResponseUtils).mockReturnValue(mockApiResponse)

    try {
      await createClientController(mockEvent)
    } catch (error) {
      expect(ClientService.prototype.createClient).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          address: '123 Main St',
        })
      )
      expect(apiResponseUtils).toHaveBeenCalledWith(
        HttpStatusEnum.INTERNAL_SERVER_ERROR,
        { error: 'Internal Server Error' }
      )
      expect(error).toEqual(mockApiResponse)
    }
  })
})

describe('getClientController', () => {
  let mockEvent: APIGatewayProxyEvent
  let mockClient: ClientEntity
  let mockApiResponse: APIGatewayProxyResult

  beforeEach(() => {
    jest.resetAllMocks()

    mockEvent = {
      pathParameters: { id: '12345' },
    } as unknown as APIGatewayProxyEvent

    mockClient = {
      clientID: '12345',
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
    }

    mockApiResponse = {
      statusCode: HttpStatusEnum.OK,
      body: JSON.stringify(mockClient),
    }
  })

  test('should get a client by ID and return 200 response', async () => {
    mocked(ClientService.prototype.getClientById).mockResolvedValue(mockClient)
    mocked(apiResponseUtils).mockReturnValue(mockApiResponse)

    const result = await getClientController(mockEvent)

    expect(ClientService.prototype.getClientById).toHaveBeenCalledWith('12345')
    expect(apiResponseUtils).toHaveBeenCalledWith(HttpStatusEnum.OK, mockClient)
    expect(result).toEqual(mockApiResponse)
  })

  test('should handle error when client is not found and return 404 response', async () => {
    const mockError: HttpError = new HttpError(HttpStatusEnum.NOT_FOUND, {
      error: 'Not Found Client',
    })
    const mockErrorResponse = '{"error":"Not Found Client"}'
    const mockApiResponse = {
      statusCode: HttpStatusEnum.NOT_FOUND,
      body: JSON.stringify({ error: 'Not Found Client' }),
    }

    mocked(ClientService.prototype.getClientById).mockRejectedValue(mockError)
    mocked(apiResponseUtils).mockReturnValue(mockApiResponse)

    const result = await getClientController(mockEvent)

    expect(apiResponseUtils).toHaveBeenCalledWith(
      HttpStatusEnum.NOT_FOUND,
      mockErrorResponse
    )
    expect(result).toEqual(mockApiResponse)
  })
})
