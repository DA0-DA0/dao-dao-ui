import { ComponentType } from 'react'

import {
  Coin,
  LoadingData,
  StatefulProfileDisplayProps,
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

export interface WithdrawTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to enter an existing address. When `true`, it shows the
  // status of the swap. `tokenSwapContractAddress` should be defined and valid
  // when this is `true`.
  contractChosen: boolean
  tokenSwapContractAddress?: string
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

  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
}

export interface ExistingTokenSwapOptions {
  tokenSwapStatusProps: TokenSwapStatusProps
  status: string
}

export interface ChooseExistingTokenSwapOptions {
  chooseLoading: boolean
  onChooseExistingContract: () => Promise<void>
}
