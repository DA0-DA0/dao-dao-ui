import { selector, selectorFamily, atom } from 'recoil'
import { GasPrice, StargateClient } from '@cosmjs/stargate'
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { connectKeplrWithoutAlerts } from '../services/keplr'
import { walletTokenBalanceUpdateCountAtom } from './treasury'
import { localStorageEffect } from '../atoms/localStorageEffect'
import { NATIVE_DENOM, GAS_PRICE } from 'util/constants'

export type WalletConnection = 'keplr' | ''

export const CHAIN_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
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
  try {
    await connectKeplrWithoutAlerts()
    // enable website to access kepler
    await (window as any).keplr.enable(CHAIN_ID)
  } catch (error) {
    return undefined
  }

  // get offline signer for signing txs
  return (window as any).keplr.getOfflineSignerAuto(CHAIN_ID)
}

//  Auto connect keplr if set as connectWallet
export const connectedWalletAtom = atom<WalletConnection>({
  key: 'connectedWallet',
  default: '',
  effects_UNSTABLE: [localStorageEffect<WalletConnection>('connectedWallet')],
})

//  Auto connect keplr if set as connectWallet
export const installWarningVisibleAtom = atom<boolean>({
  key: 'installWarningVisible',
  default: false,
})

//  Show chain warning modal when true
export const chainWarningVisibleAtom = atom<boolean>({
  key: 'chainWarningVisibleAtom',
  default: false,
})

//  Ensure chain has been enabled for connecting wallet
export const chainDisabledAtom = atom<boolean>({
  key: 'chainDisabledAtom',
  default: false,
})

export const kelprOfflineSigner = selector({
  key: 'kelprOfflineSigner',
  get: ({ get }) => {
    const connectedWallet = get(connectedWalletAtom)
    if (connectedWallet === 'keplr') {
      return getWaitKeplr()
    } else {
      return undefined
    }
  },
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
      offlineSigner,
      {
        gasPrice: GasPrice.fromString(GAS_PRICE),
      }
    )
  },
  // We have to do this because of how SigningCosmWasmClient
  // will update its internal chainId
  dangerouslyAllowMutability: true,
})

export const walletChainBalanceSelector = selector<number>({
  key: 'walletChainBalanceSelector',
  get: async ({ get }) => {
    const connectedWallet = get(connectedWalletAtom)
    if (connectedWallet !== 'keplr') {
      return 0
    }
    const client = get(stargateClient)
    if (!client) {
      return 0
    }
    const address = get(walletAddress)
    const balance = await client.getBalance(address, NATIVE_DENOM)
    return Number(balance.amount)
  },
})

export const keplrAccountNameSelector = selector<string | undefined>({
  key: 'keplrAccoutSelector',
  get: async ({ get }) => {
    // Invalidate state when the keplr instance changes.
    get(kelprOfflineSigner)
    const connectedWallet = get(connectedWalletAtom)
    if (connectedWallet !== 'keplr') {
      return ''
    }
    const info = await window.keplr?.getKey(CHAIN_ID as string)
    return info?.name
  },
})

export const walletAddress = selector({
  key: 'WalletAddress',
  get: async ({ get }) => {
    const connectedWallet = get(connectedWalletAtom)
    if (connectedWallet !== 'keplr') {
      return ''
    }
    const client = get(kelprOfflineSigner)
    if (!client) {
      return ''
    }
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
