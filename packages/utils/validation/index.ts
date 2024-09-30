import JSON5 from 'json5'

import { HugeDecimal } from '@dao-dao/math'

import {
  isValidBech32Address,
  isValidTokenFactoryDenom,
  isValidValidatorAddress,
} from '../address'
import { isValidNativeTokenDenom } from '../assets'
import { isSecretNetwork } from '../chain'
import { isValidUrl } from '../isValidUrl'
import cosmosMsgSchema from './cosmos_msg.json'
import secretCosmosMsgSchema from './cosmos_msg.secret.json'
import { makeValidateMsg } from './makeValidateMsg'

export * from './makeValidateMsg'

export const validateRequired = (v: any) => {
  if (typeof v === 'string') {
    return v.trim().length !== 0 || 'Field is required'
  }
  return (v !== null && v !== undefined) || 'Field is required'
}

export const validatePositive = (v: HugeDecimal.Value | undefined) =>
  (v && HugeDecimal.from(v).isPositive()) || 'Must be positive'

export const validateNonNegative = (v: HugeDecimal.Value | undefined) =>
  (v && HugeDecimal.from(v).gte(0)) || 'Must be 0 or more'

export const validatePercent = (v: string | number | undefined) => {
  const p = v ? Number(v) : NaN
  return (!isNaN(p) && p <= 100 && p >= 0) || 'Invalid percentage'
}

export const makeValidateAddress =
  (bech32Prefix?: string, required = true) =>
  (v: any) =>
    (!required && !v) ||
    (v && typeof v === 'string' && isValidBech32Address(v, bech32Prefix)) ||
    'Invalid address.'

export const makeValidateValidatorAddress =
  (bech32Prefix: string) => (v: string) =>
    isValidValidatorAddress(v, bech32Prefix) || 'Invalid address'

export const validateUrl = (v: string | undefined) =>
  (v && isValidUrl(v)) || 'Invalid image URL: must start with https.'

export const validateUrlWithIpfs = (v: string | undefined) =>
  (v && isValidUrl(v, true)) ||
  'Invalid image URL: must start with https or ipfs.'

export const makeValidateTokenFactoryDenom =
  (bech32Prefix: string, required = true) =>
  (v: any) =>
    (!required && !v) ||
    (v && typeof v === 'string' && isValidTokenFactoryDenom(v, bech32Prefix)) ||
    'Invalid token factory denom. Ensure it is lower–cased.'

export const validateNativeTokenDenom = (v: any) =>
  (v && typeof v === 'string' && isValidNativeTokenDenom(v)) ||
  'Invalid native token denom.'

export const validateJSON = (v: string) => {
  try {
    JSON5.parse(v)
    return true
  } catch (e: any) {
    return e?.message as string
  }
}

export const validateCosmosMsg = makeValidateMsg(cosmosMsgSchema)
export const validateSecretCosmosMsg = makeValidateMsg(secretCosmosMsgSchema)

export const validateCosmosMsgForChain = (
  chainId: string,
  obj: Record<string, any>
) =>
  isSecretNetwork(chainId)
    ? validateSecretCosmosMsg(obj)
    : validateCosmosMsg(obj)

export const validateTokenSymbol = (v: string) =>
  /^[a-zA-Z\-]{3,12}$/.test(v) ||
  'Invalid token symbol. Must be 3-12 characters long and contain only letters and hyphens.'

export const validateEmail = (v: any) =>
  (typeof v === 'string' &&
    /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/.test(
      v
    )) ||
  'Invalid email address.'
