import { Buffer } from 'buffer'

import { fromHex, toBech32 } from '@cosmjs/encoding'
import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import { ChainInfoID, ChainInfoMap } from '@noahsaso/cosmodal'
import { bondStatusToJSON } from 'cosmjs-types/cosmos/staking/v1beta1/staking'
import { Validator as RpcValidator } from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'
import RIPEMD160 from 'ripemd160'

import { Validator } from '@dao-dao/types'

import {
  CHAIN_ID,
  CHAIN_RPC_ENDPOINT,
  STARGAZE_RPC_ENDPOINT,
} from './constants'

export const getRpcForChainId = (chainId: string): string => {
  // Override from environment variables. Matched in
  // @dao-dao/stateful/components/WalletProvider.tsx
  if (chainId === CHAIN_ID) {
    return CHAIN_RPC_ENDPOINT
  } else if (chainId === ChainInfoID.Stargaze1) {
    return STARGAZE_RPC_ENDPOINT
  }

  if (!(chainId in ChainInfoMap)) {
    throw new Error(`Unknown chain ID "${chainId}"`)
  }
  return ChainInfoMap[chainId as keyof typeof ChainInfoMap].rpc
}

export const getUrlBaseForChainId = (chainId: string): string =>
  // If on same chain, keep URL.
  chainId === CHAIN_ID
    ? ''
    : // Otherwise use chain-specific one.
    chainId === ChainInfoID.Juno1
    ? 'https://daodao.zone'
    : chainId === ChainInfoID.Uni5
    ? 'https://testnet.daodao.zone'
    : ''

export const cosmosValidatorToValidator = ({
  operatorAddress: address,
  description: { moniker, website, details },
  commission,
  status,
  tokens,
}: RpcValidator): Validator => ({
  address,
  moniker,
  website:
    website && (website.startsWith('http') ? website : `https://${website}`),
  details,
  commission: decodeCosmosSdkDecFromProto(
    commission.commissionRates.rate
  ).toFloatApproximation(),
  status: bondStatusToJSON(status),
  tokens: Number(tokens),
})

// Convert public key in hex format to a bech32 address.
// https://github.com/cosmos/cosmos-sdk/blob/e09516f4795c637ab12b30bf732ce5d86da78424/crypto/keys/secp256k1/secp256k1.go#L152-L162
// Keplr implementation:
// https://github.com/chainapsis/keplr-wallet/blob/088dc701ce14df77a1ee22b7e39c651e50879d9f/packages/crypto/src/key.ts#L56-L63
export const secp256k1PublicKeyToBech32Address = async (
  hexPublicKey: string,
  bech32Prefix: string
): Promise<string> => {
  const sha256Hash = await crypto.subtle.digest(
    'SHA-256',
    fromHex(hexPublicKey)
  )
  const ripemd160Hex = new RIPEMD160()
    .update(Buffer.from(sha256Hash))
    .digest('hex')
  return toBech32(bech32Prefix, fromHex(ripemd160Hex))
}
