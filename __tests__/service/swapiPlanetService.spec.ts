import axios from 'axios'
import { SwapiPlanetService } from '../../src/service/swapiPlanetService'
import { translateKeys } from '../../src/utils/TranslationUtils'
import { translationMap } from '../../src/infrastructure/constants/SwapiPlanetConstants'

jest.mock('axios')
jest.mock('../../src/utils/TranslationUtils')

describe('SwapiPlanetService', () => {
  let swapiPlanetService: SwapiPlanetService

  beforeEach(() => {
    swapiPlanetService = new SwapiPlanetService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should get translated Swapi planet data', async () => {
    // Arrange
    const mockSwapiData = {
      name: 'Tatooine',
      rotation_period: '23',
      population: '200000',
      // ... Rest of the Swapi data fields
    }

    const mockTranslatedData = {
      planetName: 'Tatooine',
      rotationPeriod: '23',
      population: '200000',
      // ... Rest of the translated data fields
    }

    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue({
      data: mockSwapiData,
    })

    ;(translateKeys as jest.Mock).mockReturnValue(mockTranslatedData)

    // Act
    const result = await swapiPlanetService.getSwapiPlanet()

    // Assert
    expect(axiosGetMock).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/planets/1/'
    )
    expect(translateKeys).toHaveBeenCalledWith(mockSwapiData, translationMap)
    expect(result).toEqual(mockTranslatedData)
  })

  test('should throw an error when getting Swapi planet data', async () => {
    // Arrange
    const mockError = new Error('Internal Server Error')

    jest.spyOn(axios, 'get').mockRejectedValueOnce(mockError)

    // Act & Assert
    await expect(swapiPlanetService.getSwapiPlanet()).rejects.toThrow(mockError)
  })
})