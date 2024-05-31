import { ComponentType } from 'react'

import { DaoInfo } from '../dao'
import { LoadingData } from '../misc'
import { LinkWrapperProps } from './LinkWrapper'

// Loaded by card once displaying.
export type DaoCardInfoLazyData = {
  isMember: boolean
  proposalCount: number
  /**
   * Show a token line, typically TVL.
   */
  tokenWithBalance?: {
    balance: number
    symbol: string
    decimals: number
  }
}

export type FollowState = {
  following: boolean
  updatingFollowing: boolean
  onFollow: () => void
}

export type DaoCardProps = {
  info: DaoInfo
  lazyData: LoadingData<DaoCardInfoLazyData>
  follow: { hide: true } | ({ hide?: false } & FollowState)
  LinkWrapper: ComponentType<LinkWrapperProps>
  /**
   * Whether or not to show the member checkmark if they're a member. Defaults
   * to true.
   */
  showIsMember?: boolean
  /**
   * Whether or not the token loaded in lazy data is USD. Defaults to true.
   */
  showingEstimatedUsdValue?: boolean
  onMouseOver?: () => void
  onMouseLeave?: () => void
  /**
   * Optional card class name.
   */
  className?: string
}

export type StatefulDaoCardProps = Omit<
  DaoCardProps,
  'lazyData' | 'follow' | 'LinkWrapper'
>

export type LazyDaoCardProps = Omit<StatefulDaoCardProps, 'info'> & {
  /**
   * A smaller set of DAO info that doesn't need many queries.
   */
  info: Pick<
    DaoInfo,
    | 'chainId'
    | 'coreAddress'
    | 'coreVersion'
    | 'name'
    | 'description'
    | 'imageUrl'
  >
  /**
   * Whether or not this DAO is inactive.
   */
  isInactive?: boolean
  /**
   * Whether or not the current wallet is a member of this DAO.
   */
  isMember?: boolean
  /**
   * Whether or not this DAO is being followed by the current wallet.
   */
  isFollowed?: boolean
}
