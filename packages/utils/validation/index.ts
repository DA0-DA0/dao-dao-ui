import Ajv from 'ajv'
import JSON5 from 'json5'

import { CHAIN_BECH32_PREFIX } from '../constants'
import cosmosMsgSchema from '../cosmos_msg.json'
import {
  isValidAddress,
  isValidContractAddress,
  isValidValidatorAddress,
} from '../isValidAddress'
import { isValidUrl } from '../isValidUrl'

export * from './instantiate'

export const validateRequired = (
  v: string | number | boolean | null | undefined
) => {
  if (typeof v === 'string') {
    return v.trim().length !== 0 || 'Field is required'
  }
  return (v !== null && v !== undefined) || 'Field is required'
}

export const validatePositive = (v: string | number) =>
  (!isNaN(Number(v)) && Number(v) > 0) || 'Must be positive'

export const validateNonNegative = (v: string | number) =>
  (!isNaN(Number(v)) && Number(v) >= 0) || 'Must be non-negative'

export const validatePercent = (v: string | number) => {
  const p = Number(v)
  return (!isNaN(p) && p <= 100 && p >= 0) || 'Invalid percentage'
}

export const validateAddress = (v: string) =>
  isValidAddress(v, CHAIN_BECH32_PREFIX) || 'Invalid address'

export const validateValidatorAddress = (v: string) =>
  isValidValidatorAddress(v, CHAIN_BECH32_PREFIX) || 'Invalid address'

export const validateUrl = (v: string) =>
  isValidUrl(v) ||
  'Invalid URL link, must start with https and end with png/jpeg/gif.'

export const validateContractAddress = (v: string, required = true) =>
  (!required && !v) ||
  isValidContractAddress(v, CHAIN_BECH32_PREFIX) ||
  'Invalid contract address'

export const validateJSON = (v: string) => {
  try {
    JSON5.parse(v)
    return true
  } catch (e: any) {
    return e?.message as string
  }
}

const ajv = new Ajv()
const _validateCosmosMsg = ajv.compile(cosmosMsgSchema)

export const validateCosmosMsg = (msg: any) => ({
  valid: _validateCosmosMsg(msg),
  errors: _validateCosmosMsg.errors,
})

export const validateTokenSymbol = (v: string) =>
  /^[a-zA-Z\-]{3,12}$/.test(v) ||
  'Invalid token symbol. Must be 3-12 characters long and contain only letters and hyphens.'
