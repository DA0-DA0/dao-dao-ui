import { selector } from 'recoil'
import { StargateClient } from '@cosmjs/stargate'
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { connectKeplr } from 'services/keplr'

const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export const stargateClient = selector({
  key: 'StargateClient',
  get: async () => {
    return await StargateClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

export const cosmWasmClient = selector({
  key: 'CosmWasmClient',
  get: async () => {
    return await CosmWasmClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

export const kelprOfflineSigner = selector({
  key: 'KeplrOfflineSigner',
  get: async () => {
    await connectKeplr()

    // enable website to access kepler
    await (window as any).keplr.enable(CHAIN_ID)

    // get offline signer for signing txs
    return await (window as any).getOfflineSigner(CHAIN_ID)
  },
})

export const cosmWasmSigningClient = selector({
  key: 'SigningCosmWasmClient',
  get: async ({ get }) => {
    const offlineSigner = get(kelprOfflineSigner)
    return await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      offlineSigner
    )
  },
})
