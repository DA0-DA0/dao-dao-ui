import {
  isValidAddress,
  isValidContractAddress,
  isValidValidatorAddress,
} from '@dao-dao/utils'
import JSON5 from 'json5'
import { Validate } from 'react-hook-form'

import { isValidUrl } from './isValidUrl'

const CHAIN_PREFIX = process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX as string

export const validateRequired = (v: string | boolean) => {
  if (typeof v === 'string') {
    return v.trim().length != 0 || 'Field is required'
  }
  return (v !== null && v !== undefined) || 'Field is required'
}

export const validatePositive = (v: string) =>
  parseFloat(v) > 0.0 || 'Must be positive'

export const validateNonNegative = (v: string) =>
  parseFloat(v) >= 0.0 || 'Must be non-negative'

export const validatePercent = (v: string) => {
  const p = Number(v)
  return (p <= 100 && p >= 0) || 'Invalid percentage'
}

export const validateAddress = (v: string) =>
  isValidAddress(v, CHAIN_PREFIX) || 'Invalid address'

export const validateValidatorAddress = (v: string) =>
  isValidValidatorAddress(v, CHAIN_PREFIX) || 'Invalid address'

export const validateUrl = (v: string) =>
  isValidUrl(v) ||
  'Invalid URL link, must start with https and end with png/jpeg/gif.'

export const validateContractAddress = (v: string) =>
  isValidContractAddress(v, CHAIN_PREFIX) || 'Invalid contract address'

export const validateJSON = (v: string) => {
  try {
    const o = JSON5.parse(v)
    return true
  } catch (e: any) {
    return e?.message as string
  }
}
