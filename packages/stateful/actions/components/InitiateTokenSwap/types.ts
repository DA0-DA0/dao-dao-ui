import { UseFormReturn } from 'react-hook-form'

import { Coin, LoadingData, TokenSwapStatusProps } from '@dao-dao/types'
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
  tokenSwapContract?: {
    address: string
    type: 'cw20' | 'native'
    denomOrAddress: string
    amount: number
  }
}

export interface InstantiateTokenSwapProps {
  instantiateForm: UseFormReturn<InstantiateFormData>
  instantiating: boolean
  onInstantiate: (data: InstantiateFormData) => Promise<void>

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
}

export interface InstantiatedTokenSwapProps {
  tokenSwapStatusProps: TokenSwapStatusProps
}
