import { selector } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import {
  CHAIN_RPC_ENDPOINT,
  cosmWasmClientRouter,
  GAS_PRICE,
  stargateClientRouter,
} from '@dao-dao/utils'

import { keplrOfflineSigner } from './keplr'

export const stargateClient = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClient = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const signingCosmWasmClient = selector({
  key: 'signingCosmWasmClient',
  get: async ({ get }) => {
    const signer = get(keplrOfflineSigner)
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
