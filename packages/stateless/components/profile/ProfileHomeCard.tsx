import { LayersOutlined, PaymentsOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'

import { ButtonLink } from '../buttons'
import { TokenAmountDisplay } from '../token/TokenAmountDisplay'
import {
  ProfileCardWrapper,
  ProfileCardWrapperProps,
} from './ProfileCardWrapper'

export interface ProfileHomeCardProps
  extends Omit<
    ProfileCardWrapperProps,
    'children' | 'underHeaderComponent' | 'childContainerClassName' | 'compact'
  > {
  tokenSymbol: string
  tokenDecimals: number
  inboxProposalCount: number
  lazyData: LoadingData<{
    unstakedBalance: number
    stakedBalance: number
    dateBalancesFetched: Date
    proposalsCreated: number
    votesCast: number
  }>
}

export const ProfileHomeCard = ({
  established,
  tokenSymbol,
  tokenDecimals,
  inboxProposalCount,
  lazyData,
  ...wrapperProps
}: ProfileHomeCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0"
      established={established}
      underHeaderComponent={
        <div className="mt-3 grid grid-cols-[1fr_1px_1fr] items-center justify-items-center gap-2 self-stretch">
          <div className="flex flex-col items-stretch text-center">
            <PaymentsOutlined className="mb-4 !h-5 !w-5 self-center text-center text-icon-secondary" />
            <p className="secondary-text mb-1">{t('title.holdings')}</p>

            {lazyData.loading ? (
              <p className="title-text animate-pulse font-mono">...</p>
            ) : (
              <TokenAmountDisplay
                amount={lazyData.data.unstakedBalance}
                className="title-text break-words font-mono"
                dateFetched={lazyData.data.dateBalancesFetched}
                decimals={tokenDecimals}
                hideApprox
                maxDecimals={2}
                symbol={tokenSymbol}
              />
            )}
          </div>

          <div className="h-10 w-[1px] bg-border-secondary"></div>

          <div className="flex flex-col items-center text-center">
            <LayersOutlined className="mb-4 !h-5 !w-5 self-center text-icon-secondary" />
            <p className="secondary-text mb-1">{t('title.staked')}</p>

            {lazyData.loading ? (
              <p className="title-text animate-pulse font-mono">...</p>
            ) : (
              <TokenAmountDisplay
                amount={lazyData.data.stakedBalance}
                className="title-text break-words font-mono"
                dateFetched={lazyData.data.dateBalancesFetched}
                decimals={tokenDecimals}
                hideApprox
                maxDecimals={2}
                symbol={tokenSymbol}
              />
            )}
          </div>
        </div>
      }
      {...wrapperProps}
    >
      <div className="p-6">
        <div className="secondary-text flex flex-row items-center justify-between">
          <p>{t('title.proposalsCreated')}</p>

          <p
            className={clsx(
              'font-mono text-text-primary',
              lazyData.loading && 'animate-pulse'
            )}
          >
            {lazyData.loading ? '...' : lazyData.data.proposalsCreated}
          </p>
        </div>

        <div className="secondary-text mt-3 flex flex-row items-center justify-between">
          <p>{t('title.votesCast')}</p>

          <p
            className={clsx(
              'font-mono text-text-primary',
              lazyData.loading && 'animate-pulse'
            )}
          >
            {lazyData.loading ? '...' : lazyData.data.votesCast}
          </p>
        </div>
      </div>

      <div className="border-t border-t-border-primary p-6">
        <ButtonLink
          className="w-full"
          contentContainerClassName="justify-center"
          href="/inbox"
          showBadge={inboxProposalCount > 0}
          size="lg"
          variant="secondary"
        >
          {t('button.numProposalsInInbox', { count: inboxProposalCount })}
        </ButtonLink>
      </div>
    </ProfileCardWrapper>
  )
}
