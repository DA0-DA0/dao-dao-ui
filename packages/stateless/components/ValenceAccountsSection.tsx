import clsx from 'clsx'

import {
  LoadingDataWithError,
  TokenCardInfo,
  ValenceAccount,
  ValenceAccountDisplayProps,
} from '@dao-dao/types'
import { areAccountsEqual } from '@dao-dao/utils'

import { ValenceAccountDisplay } from './ValenceAccountDisplay'

export type ValenceAccountsSectionProps<T extends TokenCardInfo> = {
  /**
   * The accounts to display.
   */
  accounts: ValenceAccount[]
  /**
   * The tokens to display.
   */
  tokens: LoadingDataWithError<T[]>
  /**
   * Optional container class name.
   */
  className?: string
} & Pick<
  ValenceAccountDisplayProps<T>,
  | 'ButtonLink'
  | 'IconButtonLink'
  | 'TokenLine'
  | 'TreasuryHistoryGraph'
  | 'configureRebalancerHref'
>

export const ValenceAccountsSection = <T extends TokenCardInfo>({
  accounts,
  tokens,
  className,
  ...valenceAccountDisplayProps
}: ValenceAccountsSectionProps<T>) => (
  <div className={clsx('flex flex-col gap-6', className)}>
    {accounts.map((account) => (
      <ValenceAccountDisplay
        key={account.chainId + account.address}
        {...valenceAccountDisplayProps}
        account={account}
        tokens={
          tokens.loading || tokens.errored
            ? tokens
            : {
                loading: false,
                errored: false,
                updating: tokens.updating,
                data: tokens.data.filter(({ owner }) =>
                  areAccountsEqual(owner, account)
                ),
              }
        }
      />
    ))}
  </div>
)
