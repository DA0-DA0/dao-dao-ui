import { ComponentType } from 'react'

import { Account } from '../account'
import { LoadingDataWithError } from '../misc'
import { TokenCardInfo } from '../token'
import { StatefulProfileAddChainsProps } from './ProfileAddChains'
import { ValenceAccountDisplayProps } from './ValenceAccountDisplay'

export type ProfileWalletProps<T extends TokenCardInfo> = {
  /**
   * Whether or not this profile view is read-only.
   */
  readOnly: boolean
  /**
   * List of accounts for profile.
   */
  accounts: LoadingDataWithError<Account[]>
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
} & Pick<
  ValenceAccountDisplayProps<T>,
  | 'ButtonLink'
  | 'IconButtonLink'
  | 'configureRebalancerHref'
  | 'TreasuryHistoryGraph'
>

export type StatefulProfileWalletProps = {
  /**
   * Optionally choose which address to load the profile for. Otherwise, uses
   * the current wallet. If defined, this will not be editable.
   */
  address?: string
}
