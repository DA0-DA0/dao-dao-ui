import { ComponentType } from 'react'

import {
  AddressInputProps,
  GenericTokenBalance,
  LoadingData,
  TokenSwapStatusProps,
  TokenType,
  TransProps,
} from '@dao-dao/types'

export interface Counterparty {
  address: string
  type: TokenType
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

  selfPartyTokenBalances: GenericTokenBalance[]
  counterpartyTokenBalances: LoadingData<GenericTokenBalance[]>

  Trans: ComponentType<TransProps>
  AddressInput: ComponentType<AddressInputProps>
}

export interface ExistingTokenSwapOptions {
  tokenSwapStatusProps: TokenSwapStatusProps
  status: string
}

export interface ChooseExistingTokenSwapOptions {
  chooseLoading: boolean
  onChooseExistingContract: () => Promise<void>
}
