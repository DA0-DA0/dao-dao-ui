import { ChainInfoID, ChainInfoMap } from '@noahsaso/cosmodal'

import { CHAIN_ID } from './constants'

export const getRpcForChainId = (chainId: string): string => {
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
