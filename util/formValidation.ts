import { isValidAddress } from './isValidAddress'

export const validateRequired = (v: string) =>
  v.length > 0 || 'Field is required'

export const validatePositive = (v: string) =>
  parseInt(v) > 0 || 'Must be positive'

export const validatePercent = (v: string) => {
  const p = Number(v)
  return (p <= 100 && p >= 0) || 'Invalid percentage'
}

export const validateAddress = (v: string) =>
  isValidAddress(v) || 'Invalid address'
