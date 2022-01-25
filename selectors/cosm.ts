import { selector, selectorFamily, atom } from 'recoil'
import { StargateClient } from '@cosmjs/stargate'
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { connectKeplr } from 'services/keplr'
import { walletTokenBalanceUpdateCountAtom } from './treasury'
import { localStorageEffect } from '../atoms/localStorageEffect'

const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export const stargateClient = selector({
  key: 'stargateClient',
  get: () => {
    return StargateClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

export const cosmWasmClient = selector({
  key: 'cosmWasmClient',
  get: () => {
    return CosmWasmClient.connect(CHAIN_RPC_ENDPOINT)
  },
})

// export const offlineSigner = atom({
//   key: 'offlineSigner',
//   default: null,
// })

const getWaitKeplr = async () => {
  connectKeplr()

  // enable website to access kepler
  await (window as any).keplr.enable(CHAIN_ID)

  // get offline signer for signing txs
  return (window as any).keplr.getOfflineSignerAuto(CHAIN_ID)
}

export const kelprOfflineSigner = selector({
  key: 'kelprOfflineSigner',
  get: () => getWaitKeplr(),
})

// The map of draft proposals associated with a given contract.
export const connectedWalletAtom = atom<string>({
  key: 'connectedWallet',
  default: '',
  effects_UNSTABLE: [localStorageEffect<string>('connectedWallet')],
})

export const cosmWasmSigningClient = selector({
  key: 'cosmWasmSigningClient',
  get: async ({ get }) => {
    const offlineSigner = get(kelprOfflineSigner)
    if (!offlineSigner) {
      return null
    }
    return await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      offlineSigner
    )
  },
  // We have to do this because of how SigningCosmWasmClient
  // will update its internal chainId
  dangerouslyAllowMutability: true,
})

export const voterInfoSelector = selectorFamily({
  key: 'voterInfo',
  get:
    ({
      contractAddress,
      walletAddress,
    }: {
      contractAddress: string
      walletAddress: string
    }) =>
    async ({ get }) => {
      get(walletTokenBalanceUpdateCountAtom(walletAddress))
      const client = get(cosmWasmClient)
      const response = await client?.queryContractSmart(contractAddress, {
        voter: {
          address: walletAddress,
        },
      })

      return {
        weight: Number(response?.weight || 0),
      }
    },
})
