import { Expiration } from '@dao-dao/types/contracts/cw3-dao'

export const expirationExpired = (e: Expiration, blockHeight: number) => {
  if ('at_height' in e) {
    return blockHeight >= e.at_height
  } else if ('at_time' in e) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(e.at_time)
  }

  // Never expires.
  return false
}
