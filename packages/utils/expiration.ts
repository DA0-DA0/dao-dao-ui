import { Expiration } from '@dao-dao/types/contracts/common'

/**
 * Convert expiration to a date. Throws if the expiration is not a time.
 */
export const expirationToDate = (expiration: Expiration) =>
  'at_time' in expiration
    ? new Date(Number(expiration.at_time) / 1e6)
    : (() => {
        throw new Error('Expiration is not a time')
      })()

/**
 * Convert date to expiration.
 */
export const dateToExpiration = (date: Date): Expiration => ({
  at_time: BigInt(date.getTime() * 1e6).toString(),
})

/**
 * Whether or not the expiration is in the past. Returns undefined if the
 * expiration is in blocks and current block height is not provided.
 */
export const isExpired = (
  expiration: Expiration,
  currentBlockHeight?: number
): boolean | undefined =>
  'at_time' in expiration
    ? Number(expiration.at_time) / 1e6 < Date.now()
    : 'at_height' in expiration && !!currentBlockHeight
      ? expiration.at_height < currentBlockHeight
      : 'never' in expiration
        ? false
        : undefined
