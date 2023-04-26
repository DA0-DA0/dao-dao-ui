import Ajv from 'ajv'
import JSON5 from 'json5'
import { TFunction } from 'react-i18next'

import cosmosMsgSchema from '../cosmos_msg.json'
import {
  isValidAddress,
  isValidContractAddress,
  isValidValidatorAddress,
} from '../isValidAddress'
import { isValidUrl } from '../isValidUrl'

export * from './makeValidateMsg'

export const validateRequired = (v: any) => {
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

export const makeValidateAddress =
  (bech32Prefix: string, required = true) =>
  (v: any) =>
    (!required && !v) ||
    (v && typeof v === 'string' && isValidAddress(v, bech32Prefix)) ||
    'Invalid address'

export const makeValidateValidatorAddress =
  (bech32Prefix: string) => (v: string) =>
    isValidValidatorAddress(v, bech32Prefix) || 'Invalid address'

export const makeValidateContractAddress =
  (bech32Prefix: string, required = true) =>
  (v: any) =>
    (!required && !v) ||
    (v && typeof v === 'string' && isValidContractAddress(v, bech32Prefix)) ||
    'Invalid contract address'

export const validateUrl = (v: string | undefined) =>
  (v && isValidUrl(v)) || 'Invalid image URL: must start with https.'

export const validateUrlWithIpfs = (v: string | undefined) =>
  (v && isValidUrl(v, true)) ||
  'Invalid image URL: must start with https or ipfs.'

export const makeValidateDate =
  (t: TFunction, time = false) =>
  (v: string | undefined) =>
    (v && !isNaN(Date.parse(v))) ||
    t(time ? 'error.invalidDateTime' : 'error.invalidDate')

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
