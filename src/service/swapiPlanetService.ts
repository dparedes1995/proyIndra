import { SwapiPlanetInterfaces } from '../interfaces/swapiPlanetInterfaces'
import axios from 'axios'
import { translateKeys } from '../utils/TranslationUtils'
import { translationMap } from '../infrastructure/constants/SwapiPlanetConstants'
import { Url } from '../infrastructure/Url'

/**
 * Implementation of the SwapiPlanet service interface.
 * Provides an operation to retrieve SwapiPlanet data.
 * @implements {SwapiPlanetInterfaces}
 */
export class SwapiPlanetService implements SwapiPlanetInterfaces {
  /**
   * Retrieves SwapiPlanet data from the specified URL.
   * @returns {Promise<Record<string, string>>} - Promise resolving with the translated SwapiPlanet data.
   */
  public async getSwapiPlanet(): Promise<Record<string, string>> {
    const swapiResponse = await axios.get(Url.URL_SWAPI_PLANET)
    const swapiData = swapiResponse.data

    return translateKeys(swapiData, translationMap)
  }
}
