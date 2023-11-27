import { ComponentType } from 'react'

import { ValenceAccount } from '../account'
import { TokenCardInfo } from '../token'
import { ButtonLinkProps } from './Buttonifier'
import { LoadingData } from './common'
import { TreasuryHistoryGraphProps } from './TreasuryHistoryGraph'

export type ValenceAccountTreasuryProps<T extends TokenCardInfo> = {
  account: ValenceAccount
  tokens: LoadingData<T[]>
  TokenLine: ComponentType<T>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
  ButtonLink: ComponentType<ButtonLinkProps>
  configureRebalancerHref?: string
  className?: string
}
