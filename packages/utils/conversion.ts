import {
  Expiration,
  Threshold as DaoThreshold,
  ThresholdResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import { Threshold as SigThreshold } from '@dao-dao/types/contracts/cw3-multisig'

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
  amount = amount * Math.pow(10, decimals)
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

export const getDaoThresholdAndQuorum = (
  t: DaoThreshold
): { threshold: string | undefined; quorum: string | undefined } => {
  let threshold = undefined
  let quorum = undefined

  if ('absolute_percentage' in t) {
    threshold = (Number(t.absolute_percentage.percentage) * 100).toString()
  } else if ('threshold_quorum' in t) {
    threshold = (Number(t.threshold_quorum.threshold) * 100).toString()
    quorum = (Number(t.threshold_quorum.quorum) * 100).toString()
  }

  return { threshold, quorum }
}

export const getThresholdAndQuorumDisplay = (
  t: ThresholdResponse | DaoThreshold | SigThreshold,
  multisig: boolean,
  tokenDecimals: number
): [string, string | undefined] => {
  if ('absolute_count' in t) {
    const count = t.absolute_count.weight
    return [
      `${
        multisig
          ? count
          : convertMicroDenomToDenomWithDecimals(count, tokenDecimals)
      } vote${count != 1 ? 's' : ''}`,
      undefined,
    ]
  } else if ('absolute_percentage' in t) {
    const threshold = t.absolute_percentage.percentage
    return [`${Number(threshold) * 100}%`, undefined]
  } else if ('threshold_quorum' in t) {
    const quorum = t.threshold_quorum.quorum
    const threshold = t.threshold_quorum.threshold
    return [`${Number(threshold) * 100}%`, `${Number(quorum) * 100}%`]
  }
  return ['unknown', 'unknown']
}

export const thresholdString = (
  t: ThresholdResponse | DaoThreshold | SigThreshold,
  multisig: boolean,
  tokenDecimals: number
) => {
  if ('absolute_count' in t) {
    const count = t.absolute_count.weight
    return `${
      multisig
        ? count
        : convertMicroDenomToDenomWithDecimals(count, tokenDecimals)
    } vote${count != 1 ? 's' : ''}`
  } else if ('absolute_percentage' in t) {
    const threshold = t.absolute_percentage.percentage
    return `${Number(threshold) * 100}%`
  } else if ('threshold_quorum' in t) {
    const quorum = t.threshold_quorum.quorum
    const threshold = t.threshold_quorum.threshold
    return `${quorum}% quorum; ${threshold}% threshold`
  } else {
    return 'unknown'
  }
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
