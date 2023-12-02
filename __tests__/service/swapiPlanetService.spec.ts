import axios from 'axios'
import { SwapiPlanetService } from '../../src/service/swapiPlanetService'
import { translationMap } from '../../src/infrastructure/constants/SwapiPlanetConstants'
import { Url } from '../../src/infrastructure/Url'
import * as TranslationUtils from '../../src/utils/TranslationUtils'
jest.mock('axios')
jest.mock('../../src/utils/TranslationUtils')

describe('SwapiPlanetService', () => {
  let swapiPlanetService: SwapiPlanetService
  let axiosGetMock: jest.SpyInstance
  let translateKeysMock: jest.SpyInstance

  beforeEach(() => {
    swapiPlanetService = new SwapiPlanetService()
    axiosGetMock = jest.spyOn(axios, 'get')
    translateKeysMock = jest.spyOn(TranslationUtils, 'translateKeys')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should get translated Swapi planet data', async () => {
    const mockSwapiData = {
      name: 'Tatooine',
      rotation_period: '23',
      population: '200000',
    }

    const mockTranslatedData = {
      planetName: 'Tatooine',
      rotationPeriod: '23',
      population: '200000',
    }

    axiosGetMock.mockResolvedValue({ data: mockSwapiData })
    translateKeysMock.mockReturnValue(mockTranslatedData)

    const result = await swapiPlanetService.getSwapiPlanet()

    expect(axiosGetMock).toHaveBeenCalledWith(Url.URL_SWAPI_PLANET)
    expect(translateKeysMock).toHaveBeenCalledWith(
      mockSwapiData,
      translationMap
    )
    expect(result).toEqual(mockTranslatedData)
  })
  test('should throw an error when getting Swapi planet data', async () => {
    const mockError = new Error('Internal Server Error')

    axiosGetMock.mockRejectedValueOnce(mockError)

    await expect(swapiPlanetService.getSwapiPlanet()).rejects.toThrow(mockError)
  })

  test('should throw an error when translation fails', async () => {
    const mockSwapiData = {
      name: 'Tatooine',
      rotation_period: '23',
      population: '200000',
    }

    const mockError = new Error('Translation Error')

    axiosGetMock.mockResolvedValue({ data: mockSwapiData })
    translateKeysMock.mockImplementation(() => {
      throw mockError
    })

    await expect(swapiPlanetService.getSwapiPlanet()).rejects.toThrow(mockError)
  })
})
