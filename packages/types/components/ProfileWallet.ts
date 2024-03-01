import { ComponentType } from 'react'

import { LoadingData, LoadingDataWithError } from '../misc'
import { ProfileChain } from '../profile'
import { TokenCardInfo } from '../token'
import { StatefulProfileAddChainsProps } from './ProfileAddChains'

export type ProfileWalletProps<T extends TokenCardInfo> = {
  /**
   * List of profile chains.
   */
  chains: LoadingData<ProfileChain[]>
  /**
   * List of tokens on all chains.
   */
  tokens: LoadingDataWithError<T[]>
  /**
   * List of token `denomOrAddress` fields that should be hidden.
   */
  hiddenTokens: LoadingDataWithError<string[]>
  /**
   * Stateful token line component.
   */
  TokenLine: ComponentType<T>
  /**
   * Stateful profile add chains component.
   */
  ProfileAddChains: ComponentType<StatefulProfileAddChainsProps>
}
