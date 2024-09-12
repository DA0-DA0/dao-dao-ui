import { LoadingDataWithError } from '../misc'
import { GenericTokenBalanceAndValue } from '../token'

export type DaoRewardsDistributorClaimCardProps = {
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Claim callback.
   */
  onClaim: () => void | Promise<void>
  /**
   * Whether or not the user is claiming.
   */
  claiming: boolean
  /**
   * Pending rewards.
   */
  rewards: LoadingDataWithError<GenericTokenBalanceAndValue[]>
}

export type StatefulDaoRewardsDistributorClaimCardProps = Omit<
  DaoRewardsDistributorClaimCardProps,
  'onClaim' | 'claiming' | 'rewards'
>
