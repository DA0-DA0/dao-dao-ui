import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { OfflineSigner } from '@cosmjs/proto-signing'
import { StargateClient } from '@cosmjs/stargate'
import { atomFamily, selectorFamily, atom, selector } from 'recoil'
import { connectKeplrWithoutAlerts } from 'services/keplr'

const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export const stargateClient = atomFamily({
  key: 'StargateClient',
  default: () => {
    return StargateClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

export const cosmWasmClient = atom({
  key: 'CosmWasmClient',
  default: CosmWasmClient.connect(CHAIN_RPC_ENDPOINT),
})

export const kelprOfflineSigner = selector({
  key: 'KeplrOfflineSignerDefault',
  get: async ({ get }): Promise<OfflineSigner> => {
    await connectKeplrWithoutAlerts()

    // enable website to access kepler
    await (window as any).keplr.enable(CHAIN_ID)

    // get offline signer for signing txs
    return (window as any).getOfflineSigner(CHAIN_ID)
  },
})

// TODO: use atom instead of atomFamily
export const cosmWasmSigningClient = atomFamily({
  key: 'SigningCosmWasmClient',
  default: selectorFamily({
    key: 'SigningCosmWasmDefault',
    get:
      (_?: any) =>
      async ({ get }): Promise<SigningCosmWasmClient> => {
        const offlineSigner = await get(kelprOfflineSigner)
        const client: SigningCosmWasmClient =
          await SigningCosmWasmClient.connectWithSigner(
            CHAIN_RPC_ENDPOINT,
            offlineSigner
          )
        await client.getChainId()
        return client
      },
  }),
})

export const walletAddress = atom({
  key: 'WalletAddress',
  default: selector({
    key: 'WalletAddressDefault',
    get: async ({ get }): Promise<string> => {
      try {
        const offlineSigner = await get(kelprOfflineSigner)
        const [{ address }] = await offlineSigner.getAccounts()
        return address
      } catch (error) {
        console.log('WalletAddressDefault error', error)
        return ''
      }
    },
  }),
})
