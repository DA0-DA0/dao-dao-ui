import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Layers, Payments } from '@dao-dao/icons'
import { LoadingData } from '@dao-dao/tstypes'

import { ButtonLink } from '../Button'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileHomeCardProps {
  walletName: string
  walletAddress: string
  profileImageUrl: string | undefined | null
  established: Date
  tokenSymbol: string
  inboxProposalCount: number
  lazyData: LoadingData<{
    unstakedBalance: number
    stakedBalance: number
    proposalsCreated: number
    votesCast: number
  }>
}

export const ProfileHomeCard = ({
  walletName,
  walletAddress,
  profileImageUrl,
  established,
  tokenSymbol,
  inboxProposalCount,
  lazyData,
}: ProfileHomeCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0"
      established={established}
      imgUrl={profileImageUrl}
      underHeaderComponent={
        <div className="grid grid-cols-[1fr_1px_1fr] gap-2 justify-items-center items-center self-stretch mt-3">
          <div className="flex flex-col items-stretch text-center">
            <Payments className="self-center mb-4 w-5 h-4 text-center text-icon-secondary" />
            <p className="mb-1 secondary-text">{t('title.holdings')}</p>
            <p
              className={clsx(
                'font-mono break-words title-text',
                lazyData.loading && 'animate-pulse'
              )}
            >
              {lazyData.loading
                ? '...'
                : lazyData.data.unstakedBalance.toLocaleString(undefined, {
                    // eslint-disable-next-line i18next/no-literal-string
                    notation: 'compact',
                    maximumFractionDigits: 2,
                  })}{' '}
              ${tokenSymbol}
            </p>
          </div>

          <div className="w-[1px] h-10 bg-border-secondary"></div>

          <div className="flex flex-col items-center text-center">
            <Layers className="self-center mb-4 w-5 h-4 text-icon-secondary" />
            <p className="mb-1 secondary-text">{t('title.staked')}</p>
            <p
              className={clsx(
                'font-mono break-words title-text',
                lazyData.loading && 'animate-pulse'
              )}
            >
              {lazyData.loading
                ? '...'
                : lazyData.data.stakedBalance.toLocaleString(undefined, {
                    // eslint-disable-next-line i18next/no-literal-string
                    notation: 'compact',
                    maximumFractionDigits: 2,
                  })}{' '}
              ${tokenSymbol}
            </p>
          </div>
        </div>
      }
      walletAddress={walletAddress}
      walletName={walletName}
    >
      <div className="p-6">
        <div className="flex flex-row justify-between items-center secondary-text">
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

        <div className="flex flex-row justify-between items-center mt-3 secondary-text">
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

      <div className="p-6 border-t border-t-border-primary">
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
