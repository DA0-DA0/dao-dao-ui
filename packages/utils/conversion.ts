import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { Expiration } from '@dao-dao/types/legacy/cw3-dao'

import { secondsToWdhms } from './time'

export function convertMicroDenomToDenomWithDecimals(
  amount: number | string,
  decimals: number
) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount / Math.pow(10, decimals)
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenomWithDecimals(
  amount: number | string,
  decimals: number
): string {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  // Need to round. Example: `8.029409 * Math.pow(10, 6)`.
  amount = Math.round(amount * Math.pow(10, decimals))
  return isNaN(amount) ? '0' : String(amount)
}

export function convertDenomToHumanReadableDenom(denom: string): string {
  if (denom.startsWith('u')) {
    return denom.substring(1)
  }
  return denom
}

export function convertDenomToContractReadableDenom(denom: string): string {
  if (denom.startsWith('u')) {
    return denom
  }
  return 'u' + denom
}

export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase()
}

export function convertToFixedDecimals(amount: number | string): string {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  if (amount > 0.01) {
    return amount.toFixed(2)
  } else return String(amount)
}

export const expirationAtTimeToSecondsFromNow = (exp: Expiration) => {
  if (!('at_time' in exp)) {
    return undefined
  }

  const end = Number(exp['at_time'])
  const nowSeconds = new Date().getTime() / 1000
  const endSeconds = end / 1000000000

  return endSeconds - nowSeconds
}

export const zeroPad = (num: number, target: number) => {
  const s = num.toString()
  if (s.length > target) {
    return s
  }
  return '0'.repeat(target - s.length) + s
}

export const getProposalEnd = (exp: Expiration, status: `${Status}`) => {
  if (status !== Status.Open) {
    return 'Completed'
  }
  if (exp && 'at_time' in exp) {
    const secondsFromNow = expirationAtTimeToSecondsFromNow(exp)
    // Type check, but should never happen.
    if (secondsFromNow === undefined) {
      return ''
    }

    if (secondsFromNow <= 0) {
      return 'Completed'
    } else {
      return secondsToWdhms(secondsFromNow)
    }
  }
  // Not much we can say about proposals that expire at a block
  // height / never.
  return ''
}
