import { selector, atom } from 'recoil'
import { StargateClient } from '@cosmjs/stargate'
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { getKeplr, connectKeplr } from 'services/keplr'

const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export const stargateClient = selector({
  key: 'StargateClient1',
  get: async () => {
    return await StargateClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

export const cosmWasmClient = selector({
  key: 'CosmWasmClient1',
  get: async () => {
    return await CosmWasmClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

export const offlineSigner = atom({
  key: 'OfflineSigner1',
  default: null,
})

const getWaitKeplr = async () => {
  await connectKeplr()

  // enable website to access kepler
  await (window as any).keplr.enable(CHAIN_ID)

  // get offline signer for signing txs
  return (window as any).keplr.getOfflineSigner(CHAIN_ID)
}

export const kelprOfflineSigner = selector({
  key: 'KeplrOfflineSigner1',
  get: () => getWaitKeplr(),
})

export const cosmWasmSigningClient = selector({
  key: 'SigningCosmWasmClient1',
  get: async ({ get }) => {
    const offlineSigner = get(kelprOfflineSigner)
    return await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      offlineSigner
    )
  },
})

export const walletAddress = selector({
  key: 'WalletAddress1',
  get: async ({ get }) => {
    const client = get(kelprOfflineSigner)
    const [{ address }] = await client.getAccounts()
    return address
  },
})
