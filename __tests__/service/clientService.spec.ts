import { ClientService } from '../../src/service/clientService'
import { getItem, putItem } from '../../src/gateway/dynamoGateway'
jest.mock('../../src/gateway/dynamoGateway')

describe('ClientService', () => {
  let clientService: ClientService
  let mockedPutItem: jest.Mock
  let mockedGetItem: jest.Mock

  beforeEach(() => {
    clientService = new ClientService()
    mockedPutItem = putItem as jest.Mock
    mockedGetItem = getItem as jest.Mock
  })

  describe('createClient', () => {
    const clientEntity = {
      name: 'David',
      lastName: 'Paredes',
      email: 'dparedes.cibertec@gmail.com',
      phone: '1234567',
      address: 'los halcones',
    }

    test('should create a new client and return it', async () => {
      mockedPutItem.mockResolvedValue(Promise.resolve())

      const result = await clientService.createClient(clientEntity)

      expect(mockedPutItem).toHaveBeenCalledWith({
        TableName: 'ClientTable',
        Item: expect.objectContaining(clientEntity),
      })
      expect(result).toEqual(expect.objectContaining(clientEntity))
    })

    test('should throw an error if the request body is invalid', async () => {
      const invalidRequestBody = {
        name: 'David',
        lastName: 'Paredes',
        phone: '1234567',
        address: 'los halcones',
      }

      await expect(
        clientService.createClient(invalidRequestBody)
      ).rejects.toThrow()
    })

    test('should throw an error if putItem fails', async () => {
      mockedPutItem.mockRejectedValue(new Error('Failed to put item'))

      await expect(clientService.createClient(clientEntity)).rejects.toThrow(
        'Failed to put item'
      )
    })
  })

  describe('getClientById', () => {
    const clientId = '12345'
    const expectedClient = {
      clientID: clientId,
      name: 'John Doe',
      email: 'johndoe@example.com',
    }

    test('should get a client by ID and return it', async () => {
      mockedGetItem.mockResolvedValue(expectedClient)

      const result = await clientService.getClientById(clientId)

      expect(mockedGetItem).toHaveBeenCalledWith({
        TableName: 'ClientTable',
        Key: { clientID: clientId },
      })
      expect(result).toEqual(expectedClient)
    })

    test('should throw an error if getItem fails', async () => {
      mockedGetItem.mockRejectedValue(new Error('Failed to get item'))

      await expect(clientService.getClientById(clientId)).rejects.toThrow(
        'Failed to get item'
      )
    })

    test('should throw an error if the client does not exist', async () => {
      mockedGetItem.mockResolvedValue(undefined)

      await expect(clientService.getClientById(clientId)).rejects.toThrow(
        'Not Found Client'
      )
    })
  })
})
