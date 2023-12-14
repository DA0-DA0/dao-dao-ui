import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { atom, atomFamily } from 'recoil'

import { DEFAULT_CHAIN_ID, getConfiguredChains } from '@dao-dao/utils'

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
  default: DEFAULT_CHAIN_ID,
  effects: [
    localStorageEffect(JSON.stringify, (jsonValue: string) => {
      const value = JSON.parse(jsonValue)
      // If no supported chain matches, set to default.
      return getConfiguredChains().some(({ chain }) => chain.chain_id === value)
        ? value
        : DEFAULT_CHAIN_ID
    }),
  ],
})
