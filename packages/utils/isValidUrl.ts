export const isValidUrl = (url: string, allowedProtocols?: string[]) => {
  let u
  try {
    u = new URL(url)
  } catch {
    return false
  }
  return !allowedProtocols || allowedProtocols.includes(u.protocol)
}
