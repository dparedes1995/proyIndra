/**
 * Represents the interface for retrieving a SWAPI planet.
 *
 * @remarks
 * This interface provides the structure for retrieving information about a planet from the Star Wars API (SWAPI).
 */
export interface SwapiPlanetInterfaces {
  /**
   * Retrieves a SWAPI planet.
   * @returns A promise that resolves to a record containing string key-value pairs.
   */
  getSwapiPlanet(): Promise<Record<string, string>>
}
