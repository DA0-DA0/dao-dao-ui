import { UseFormReturn } from 'react-hook-form'

import { Coin, LoadingData, TokenSwapStatusProps } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'

//! Initial instantiate form interfaces.

export interface Counterparty {
  address: string
  denomOrAddress: string
  amount: number
}

export interface InstantiateFormData {
  selfParty: Omit<Counterparty, 'address'>
  counterparty: Counterparty
}

//! Action interfaces.

export interface InitiateTokenSwapData {
  tokenSwapContractAddress?: string
}

export type InitiateTokenSwapOptions =
  | {
      contractInstantiated: true

      tokenSwapStatusProps: TokenSwapStatusProps
    }
  | {
      contractInstantiated: false

      instantiateForm: UseFormReturn<InstantiateFormData>
      onInstantiate: (data: InstantiateFormData) => Promise<void>

      selfNativeBalances: readonly Coin[]
      selfCw20Balances: {
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
