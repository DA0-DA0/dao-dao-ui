import { ComponentType } from 'react'

import {
  Coin,
  LoadingData,
  ProfileDisplayProps,
  TokenSwapStatusProps,
} from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'

//! Initial instantiate form interfaces.

export interface Counterparty {
  address: string
  type: 'cw20' | 'native'
  denomOrAddress: string
  amount: number
  decimals: number
}

export interface InstantiateFormData {
  selfParty: Omit<Counterparty, 'address'>
  counterparty: Counterparty
}

//! Action interfaces.

export interface InitiateTokenSwapData {
  tokenSwapContractAddress?: string
  instantiateData?: InstantiateFormData
}

export interface InstantiateTokenSwapOptions {
  instantiating: boolean
  onInstantiate: () => Promise<void>

  selfPartyNativeBalances: readonly Coin[]
  selfPartyCw20Balances: {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]

  counterpartyNativeBalances: LoadingData<readonly Coin[]>
  counterpartyCw20Balances: LoadingData<
    {
      address: string
      balance: string
      info: TokenInfoResponse
    }[]
  >

  ProfileDisplay: ComponentType<Omit<ProfileDisplayProps, 'loadingProfile'>>
}

export interface InstantiatedTokenSwapOptions {
  tokenSwapStatusProps: TokenSwapStatusProps
}
