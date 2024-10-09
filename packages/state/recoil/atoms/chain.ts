import { atom, atomFamily } from 'recoil'

import { ChainId } from '@dao-dao/types'
import {
  MAINNET,
  SupportedSigningCosmWasmClient,
  getConfiguredChains,
  getSupportedChains,
} from '@dao-dao/utils'

import { localStorageEffect } from '../effects'

export const signingCosmWasmClientAtom = atomFamily<
  SupportedSigningCosmWasmClient | undefined,
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
      return getConfiguredChains().some(({ chain }) => chain.chainId === value)
        ? value
        : getSupportedChains()[0].chainId
    }),
  ],
})
