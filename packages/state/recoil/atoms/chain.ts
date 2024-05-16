import { atom, atomFamily } from 'recoil'

import { ChainId, PermitForPermitData } from '@dao-dao/types'
import {
  MAINNET,
  SupportedCosmWasmClient,
  getConfiguredChains,
  getSupportedChains,
} from '@dao-dao/utils'

import { localStorageEffect, localStorageEffectJSON } from '../effects'

export const signingCosmWasmClientAtom = atomFamily<
  SupportedCosmWasmClient | undefined,
  { chainId: string }
>({
  key: 'signingCosmWasmClient',
  dangerouslyAllowMutability: true,
})

export const walletChainIdAtom = atom<string>({
  key: 'walletChainId',
  default: MAINNET ? ChainId.JunoMainnet : ChainId.JunoTestnet,
  effects: [
    localStorageEffect(JSON.stringify, (jsonValue: string) => {
      const value = JSON.parse(jsonValue)
      // If no configured chain matches, set to default.
      return getConfiguredChains().some(({ chain }) => chain.chain_id === value)
        ? value
        : getSupportedChains()[0].chainId
    }),
  ],
})

/**
 * Store the Secret Network permit for a given wallet address and DAO in local
 * storage.
 */
export const secretNetworkPermitAtom = atomFamily<
  PermitForPermitData | undefined,
  {
    walletAddress: string
    dao: string
  }
>({
  key: 'secretNetworkPermit',
  effects: [localStorageEffectJSON],
})
