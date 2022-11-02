export const isValidUrl = (url: string) => {
  let u
  try {
    u = new URL(url)
  } catch (_) {
    return false
  }
  return u.protocol === 'https:'
}
