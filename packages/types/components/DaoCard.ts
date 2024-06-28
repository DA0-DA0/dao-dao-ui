import { ComponentType } from 'react'

import { DaoInfo } from '../dao'
import { LoadingDataWithError } from '../misc'
import { LinkWrapperProps } from './LinkWrapper'

// Loaded by card once displaying.
export type DaoCardLazyData = {
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
  lazyData: LoadingDataWithError<DaoCardLazyData>
  follow: { hide: true } | ({ hide?: false } & FollowState)
  LinkWrapper: ComponentType<LinkWrapperProps>
  isMember?: boolean
  /**
   * Whether or not to show the member checkmark if they're a member. Defaults
   * to true.
   */
  showIsMember?: boolean
  /**
   * Whether or not the token loaded in lazy data is USD. Defaults to true.
   */
  showingEstimatedUsdValue?: boolean
  /**
   * Whether or not to show the parent DAO if it exists. This is used primarily
   * to hide the parent DAO until the app is mounted in the browser since
   * rendering it on the server causes a hydration error for some horrible
   * reason. I think it has something to do with the fact that you're not
   * supposed to nest an a tag inside of another a tag, and maybe the Next.js
   * server is sanitizing it or something. Anyways, rip. Defaults to true.
   */
  showParentDao?: boolean
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
