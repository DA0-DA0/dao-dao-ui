import { selector } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import {
  CHAIN_RPC_ENDPOINT,
  cosmWasmClientRouter,
  GAS_PRICE,
  stargateClientRouter,
} from '@dao-dao/utils'

import { keplrOfflineSignerSelector } from './keplr'

export const stargateClientAtom = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClientAtom = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const signingCosmWasmClientAtom = selector({
  key: 'signingCosmWasmClient',
  get: async ({ get }) => {
    const signer = get(keplrOfflineSignerSelector)
    if (!signer) return

    return await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      signer,
      {
        gasPrice: GasPrice.fromString(GAS_PRICE),
      }
    )
  },
  // DAO DAO:
  // We have to do this because of how SigningCosmWasmClient
  // will update its internal chainId
  dangerouslyAllowMutability: true,
})
