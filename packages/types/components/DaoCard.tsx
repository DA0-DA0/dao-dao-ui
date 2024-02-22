import { ComponentType } from 'react'

import { DaoParentInfo, PolytoneProxies } from '../dao'
import { LoadingData } from '../misc'
import { LinkWrapperProps } from './LinkWrapper'

// Loaded by card once displaying.
export interface DaoCardInfoLazyData {
  isMember: boolean
  tokenBalance: number
  proposalCount: number
}

export interface DaoCardInfo {
  chainId: string
  coreAddress: string
  name: string
  description: string
  imageUrl: string
  polytoneProxies: PolytoneProxies
  established?: Date
  className?: string
  showIsMember?: boolean
  parentDao?: DaoParentInfo
  tokenSymbol: string
  showingEstimatedUsdValue: boolean
  tokenDecimals: number

  lazyData: LoadingData<DaoCardInfoLazyData>
}

export interface FollowState {
  following: boolean
  updatingFollowing: boolean
  onFollow: () => void
}

export interface DaoCardProps extends DaoCardInfo {
  onMouseOver?: () => void
  onMouseLeave?: () => void
  LinkWrapper: ComponentType<LinkWrapperProps>
  follow: { hide: true } | ({ hide?: false } & FollowState)
}

export type LazyDaoCardProps = Pick<
  DaoCardProps,
  'chainId' | 'coreAddress' | 'name' | 'description' | 'imageUrl' | 'className'
> & {
  isInactive?: boolean
}
