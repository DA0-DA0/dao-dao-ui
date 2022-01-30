import JSON5 from 'json5'

import { isValidAddress, isValidContractAddress } from './isValidAddress'

export const validateRequired = (v: string) => {
  return !!v || 'Field is required'
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
  isValidAddress(v) || 'Invalid address'

export const validateContractAddress = (v: string) =>
  isValidContractAddress(v) || 'Invalid contract address'

export const validateJSON = (v: string) => {
  try {
    const o = JSON5.parse(v)
    return true
  } catch (e: any) {
    return e?.message as string
  }
}
