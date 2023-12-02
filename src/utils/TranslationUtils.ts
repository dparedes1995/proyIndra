export function translateKeys<T>(
  inputObject: Record<string, T>,
  translationMap: Record<string, string>
): Record<string, T> {
  const translatedObject: Record<string, T> = {}

  for (const key in inputObject) {
    const translatedKey = translationMap[key] || key
    translatedObject[translatedKey] = inputObject[key]
  }

  return translatedObject
}
