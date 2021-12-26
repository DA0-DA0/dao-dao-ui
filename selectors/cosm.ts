import { selector, selectorFamily } from 'recoil'
import { StargateClient } from '@cosmjs/stargate'
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { connectKeplr } from 'services/keplr'

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
  await connectKeplr()

  // enable website to access kepler
  await (window as any).keplr.enable(CHAIN_ID)

  // get offline signer for signing txs
  return (window as any).keplr.getOfflineSigner(CHAIN_ID)
}

export const kelprOfflineSigner = selector({
  key: 'kelprOfflineSigner',
  get: () => getWaitKeplr(),
})

export const cosmWasmSigningClient = selector({
  key: 'cosmWasmSigningClient',
  get: async ({ get }) => {
    const offlineSigner = get(kelprOfflineSigner)
    return await SigningCosmWasmClient.connectWithSigner(
      CHAIN_RPC_ENDPOINT,
      offlineSigner
    )
  },
})

export const walletAddressSelector = selector({
  key: 'walletAddress',
  get: async ({ get }) => {
    const client = get(kelprOfflineSigner)
    const [{ address }] = await client.getAccounts()
    return address
  },
})

export const voterInfoSelector = selectorFamily({
  key: 'voterInfo',
  get: ({contractAddress, walletAddress}: {contractAddress: string, walletAddress: string}) => async ({get}) => {
    // const client = get(cosmWasmSigningClient)
    const client = get(cosmWasmClient)
    return client?.queryContractSmart(contractAddress, {
      voter: {
        address: walletAddress,
      },
    })
  }
})
