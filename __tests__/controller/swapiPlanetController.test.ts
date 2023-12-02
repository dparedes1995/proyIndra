import { SwapiPlanetService } from '../../src/service/swapiPlanetService'
import { APIGatewayProxyResult } from 'aws-lambda'
import { HttpStatusEnum } from '../../src/infrastructure/enums/httpStatusEnum'
import { swapiPlanetController } from '../../src/controller/swapiPlanetController'
import { apiResponseUtils } from '../../src/utils/apiResponseUtils'
import { SwapiPlanet } from '../../src/entities/swapiPlanet'
jest.mock('../../src/service/swapiPlanetService')
jest.mock('../../src/utils/apiResponseUtils')
const mockGetSwapiPlanet = jest.fn()
jest
  .spyOn(SwapiPlanetService.prototype, 'getSwapiPlanet')
  .mockImplementation(mockGetSwapiPlanet)

describe('swapiPlanetController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return 200 response with swapiPlanet data', async () => {
    const mockSwapiPlanet: SwapiPlanet = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [
        'https://swapi.py4e.com/api/people/1/',
        'https://swapi.py4e.com/api/people/2/',
        'https://swapi.py4e.com/api/people/4/',
        'https://swapi.py4e.com/api/people/6/',
        'https://swapi.py4e.com/api/people/7/',
        'https://swapi.py4e.com/api/people/8/',
        'https://swapi.py4e.com/api/people/9/',
        'https://swapi.py4e.com/api/people/11/',
        'https://swapi.py4e.com/api/people/43/',
        'https://swapi.py4e.com/api/people/62/',
      ],
      films: [
        'https://swapi.py4e.com/api/films/1/',
        'https://swapi.py4e.com/api/films/3/',
        'https://swapi.py4e.com/api/films/4/',
        'https://swapi.py4e.com/api/films/5/',
        'https://swapi.py4e.com/api/films/6/',
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.py4e.com/api/planets/1/',
    }
    mockGetSwapiPlanet.mockResolvedValue(mockSwapiPlanet)

    const expectedResponse: APIGatewayProxyResult = {
      statusCode: HttpStatusEnum.OK,
      body: JSON.stringify(mockSwapiPlanet),
    }

    ;(apiResponseUtils as jest.Mock).mockReturnValue(expectedResponse)
    const result = await swapiPlanetController()

    expect(mockGetSwapiPlanet).toHaveBeenCalledTimes(1) // Ensure the service method is called once
    expect(apiResponseUtils).toHaveBeenCalledWith(
      HttpStatusEnum.OK,
      mockSwapiPlanet
    )
    expect(result).toEqual(expectedResponse)
  })

  test('should return error response when there is an error getting the swapiPlanet data', async () => {
    const mockError = new Error('Internal Server Error')
    mockGetSwapiPlanet.mockRejectedValue(mockError)

    try {
      await swapiPlanetController()
    } catch (error) {
      console.log('Error in test:', error)
    }

    expect(mockGetSwapiPlanet).toHaveBeenCalledTimes(1)
    expect(apiResponseUtils).not.toHaveBeenCalled()
  })
})
