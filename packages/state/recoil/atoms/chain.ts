import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { atom, atomFamily } from 'recoil'

import { ChainId } from '@dao-dao/types'
import {
  MAINNET,
  getConfiguredChains,
  getSupportedChains,
} from '@dao-dao/utils'

import { localStorageEffect } from '../effects'

export const signingCosmWasmClientAtom = atomFamily<
  SigningCosmWasmClient | undefined,
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
