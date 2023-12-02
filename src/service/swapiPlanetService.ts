import { SwapiPlanetInterfaces } from '../interfaces/swapiPlanetInterfaces'
import axios from 'axios'
import { translateKeys } from '../utils/TranslationUtils'
import { translationMap } from '../infrastructure/constants/SwapiPlanetConstants'

export class SwapiPlanetService implements SwapiPlanetInterfaces {
  public async getSwapiPlanet(): Promise<Record<string, string>> {
    const swapiResponse = await axios.get(
      'https://swapi.py4e.com/api/planets/1/'
    )
    const swapiData = swapiResponse.data

    return translateKeys(swapiData, translationMap)
  }
}
