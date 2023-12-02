export const translateKeys = <T>(
  inputObject: Record<string, T>,
  translationMap: Record<string, string>
): Record<string, T> => {
  const translatedObject: Record<string, T> = {}

  for (const key in inputObject) {
    if (key in translationMap) {
      translatedObject[translationMap[key]] = inputObject[key]
    } else {
      translatedObject[key] = inputObject[key]
    }
  }

  return translatedObject
}
