import { ClientService } from '../../src/service/clientService'
import { getItem, putItem } from '../../src/gateway/dynamoGateway'
import { HttpError } from '../../src/utils/errorUtils'

jest.mock('../../src/gateway/dynamoGateway')

describe('ClientService', () => {
  let clientService: ClientService

  beforeEach(() => {
    clientService = new ClientService()
  })

  describe('createClient', () => {
    test('should create a new client and return it', async () => {
      const clientEntity = {
        name: 'David',
        lastName: 'Paredes',
        email: 'dparedes.cibertec@gmail.com',
        phone: '1234567',
        address: 'los halcones',
      }

      const mockedPutItem: jest.Mock = putItem as jest.Mock
      mockedPutItem.mockResolvedValue(Promise.resolve())

      const result = await clientService.createClient(clientEntity)

      expect(mockedPutItem).toHaveBeenCalledWith({
        TableName: 'ClientTable',
        Item: expect.objectContaining({
          name: 'David',
          lastName: 'Paredes',
          email: 'dparedes.cibertec@gmail.com',
          phone: '1234567',
          address: 'los halcones',
        }),
      })
      expect(result).toEqual(expect.objectContaining(clientEntity))
    })

    test('should throw an error if the request body is invalid', async () => {
      const requestBody = {
        name: 'David',
        lastName: 'Paredes',
        phone: '1234567',
        address: 'los halcones',
      }

      await expect(clientService.createClient(requestBody)).rejects.toThrow()
    })
  })

  describe('getClientById', () => {
    test('should get a client by ID and return it', async () => {
      const clientId = '12345'
      const expectedClient = {
        clientID: clientId,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }

      const mockedGetItem = getItem as jest.Mock
      mockedGetItem.mockResolvedValue(expectedClient)

      const result = await clientService.getClientById(clientId)

      expect(mockedGetItem).toHaveBeenCalledWith({
        TableName: 'ClientTable',
        Key: {
          clientID: clientId,
        },
      })
      expect(result).toEqual(expectedClient)
    })

    test('should throw an error if the client is not found', async () => {
      const clientId = '12345'

      const mockedGetItem = getItem as jest.Mock
      mockedGetItem.mockResolvedValue(undefined)

      await expect(clientService.getClientById(clientId)).rejects.toThrow(
        HttpError
      )
    })
  })
})
