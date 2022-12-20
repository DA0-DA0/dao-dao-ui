export const isValidUrl = (url: string, allowIpfs = false) => {
  let u
  try {
    u = new URL(url)
  } catch (_) {
    return false
  }
  return u.protocol === 'https:' || (allowIpfs && u.protocol === 'ipfs:')
}
