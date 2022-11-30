import { ComponentType } from 'react'

import {
  Coin,
  LoadingData,
  ProfileDisplayProps,
  TokenSwapStatusProps,
} from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'

export interface Counterparty {
  address: string
  type: 'cw20' | 'native'
  denomOrAddress: string
  amount: number
  decimals: number
}

export interface PerformTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to create a new swap contract or enter an existing
  // address. When `true`, it shows the status of the swap.
  // `tokenSwapContractAddress` should be defined and valid when this is `true`.
  contractChosen: boolean

  tokenSwapContractAddress?: string

  selfParty?: Omit<Counterparty, 'address'>
  counterparty?: Counterparty
}

//! Stateless component options

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

export interface ExistingTokenSwapOptions {
  tokenSwapStatusProps: TokenSwapStatusProps
}

export interface ChooseExistingTokenSwapOptions {
  chooseLoading: boolean
  onChooseExistingContract: () => Promise<void>
}
