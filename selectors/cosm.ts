import { selector, selectorFamily, atom } from 'recoil'
import { StargateClient } from '@cosmjs/stargate'
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { connectKeplr } from '../services/keplr'
import { walletTokenBalanceUpdateCountAtom } from './treasury'
import { walletAddress as walletAddressSelector } from './cosm'
import { localStorageEffect } from '../atoms/localStorageEffect'

export type WalletConnection = 'keplr' | ''

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

const getWaitKeplr = async () => {
  connectKeplr()

  try {
    // enable website to access kepler
    await (window as any).keplr.enable(CHAIN_ID)
  } catch {
    return undefined
  }

  // get offline signer for signing txs
  return (window as any).keplr.getOfflineSignerAuto(CHAIN_ID)
}

export const kelprOfflineSigner = selector({
  key: 'kelprOfflineSigner',
  get: () => getWaitKeplr(),
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

//  Auto connect keplr if set as connectWallet
export const connectedWalletAtom = atom<WalletConnection>({
  key: 'connectedWallet',
  default: '',
  effects_UNSTABLE: [localStorageEffect<WalletConnection>('connectedWallet')],
})

export const walletAddress = selector({
  key: 'WalletAddress',
  get: async ({ get }) => {
    const connectedWallet = get(connectedWalletAtom)
    if (connectedWallet !== 'keplr') {
      return ''
    }
    const client = get(kelprOfflineSigner)
    const [{ address }] = await client.getAccounts()
    return address as string
  },
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
      if (!walletAddress) {
        return {
          weight: 0,
        }
      }

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
