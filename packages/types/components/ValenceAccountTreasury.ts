import { ComponentType } from 'react'

import { ValenceAccount } from '../account'
import { TokenCardInfo } from '../token'
import { ButtonLinkProps } from './Buttonifier'
import { LoadingDataWithError } from './common'
import { IconButtonLinkProps } from './IconButtonLink'
import { TreasuryHistoryGraphProps } from './TreasuryHistoryGraph'

export type ValenceAccountTreasuryProps<T extends TokenCardInfo> = {
  account: ValenceAccount
  tokens: LoadingDataWithError<T[]>
  TokenLine: ComponentType<T>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
  ButtonLink: ComponentType<ButtonLinkProps>
  IconButtonLink: ComponentType<IconButtonLinkProps>
  configureRebalancerHref?: string
  className?: string
  // If true, hide the header, background, and board. This is used when shown in
  // a DAO treasury.
  inline?: boolean
}
