export const stringToUrl = (str: string) => {
  try {
    return new URL(str)
  } catch (e) {
    return new URL('/')
  }
}