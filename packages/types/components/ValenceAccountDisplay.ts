import { ComponentType } from 'react'

import { ValenceAccount } from '../account'
import { LoadingDataWithError } from '../misc'
import { TokenCardInfo } from '../token'
import { ButtonLinkProps } from './Buttonifier'
import { IconButtonLinkProps } from './IconButtonLink'
import { TreasuryHistoryGraphProps } from './TreasuryHistoryGraph'

export type ValenceAccountDisplayProps<T extends TokenCardInfo> = {
  account: ValenceAccount
  tokens: LoadingDataWithError<T[]>
  TokenLine: ComponentType<T>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
  ButtonLink: ComponentType<ButtonLinkProps>
  IconButtonLink: ComponentType<IconButtonLinkProps>
  configureRebalancerHref?: string
  className?: string
}
