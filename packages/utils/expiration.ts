import { Expiration } from '@dao-dao/types/legacy/cw3-dao'

export const expirationExpired = (
  expiration: Expiration,
  blockHeight: number
) => {
  if ('at_height' in expiration) {
    return blockHeight >= expiration.at_height
  } else if ('at_time' in expiration) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(expiration.at_time)
  }

  // Never expires.
  return false
}
