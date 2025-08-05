export const isValidUrl = (url: string, allowedProtocols?: string[]) => {
  let u
  try {
    u = new URL(url)
  } catch (_) {
    return false
  }
  return !allowedProtocols || allowedProtocols.includes(u.protocol)
}
