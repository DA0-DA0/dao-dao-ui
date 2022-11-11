import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import { ChainInfoID, ChainInfoMap } from '@noahsaso/cosmodal'
import { bondStatusToJSON } from 'cosmjs-types/cosmos/staking/v1beta1/staking'
import { Validator as RpcValidator } from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'

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
