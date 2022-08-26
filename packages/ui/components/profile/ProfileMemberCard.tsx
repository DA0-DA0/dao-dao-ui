import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

// Represents a tranch of tokens that is currently unstaking and will become
// available at some well-known later date.
export interface UnstakingTokensTranch {
  tokenSymbol: string
  unstakingTokens: number
  available: Date
}

export interface ProfileMemberCardProps {
  loadingClaiming?: boolean
  loadingManaging?: boolean
  votingPower: number
  daoName: string
  walletName: string
  profileImgUrl: string
  tokenSymbol: string
  stakedTokens: number
  tokenDecimals: number
  unstakingTokensTranches: UnstakingTokensTranch[]
  unstakedTokens: number
  openProposals?: boolean
  established: Date
}

export const ProfileMemberCard = ({
  loadingClaiming,
  loadingManaging,
  votingPower,
  daoName,
  walletName,
  profileImgUrl,
  tokenSymbol,
  stakedTokens,
  tokenDecimals,
  unstakingTokensTranches,
  unstakedTokens,
  openProposals,
  established,
}: ProfileMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      established={established}
      imgUrl={profileImgUrl}
      underHeaderComponent={<MembershipPill daoName={daoName} isMember />}
      walletName={walletName}
    >
      <div className="py-6 px-6 border-t border-t-border-primary">
        <div className="flex flex-row justify-between items-center pb-3 text-xs text-bold">
          <p>{t('title.yourEquity')}</p>
        </div>

        <div className="flex flex-row justify-between items-center pb-3 secondary-text">
          <p>{t('title.stakedTokens')}</p>
          <p className="font-mono text-text-primary">
            {stakedTokens.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            })}{' '}
            ${tokenSymbol}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center pb-3 secondary-text">
          <p>{t('title.votingPower')}</p>
          <p className="font-mono text-text-primary">{votingPower}%</p>
        </div>

        <div className="flex flex-row justify-between items-center pb-3 secondary-text">
          <p>{t('title.unstakingTokens')}</p>
          <p
            className={clsx('font-mono', {
              'text-text-primary underline underline-offset-4':
                unstakingTokensTranches.length > 0,
              'text-secondary': unstakingTokensTranches.length === 0,
            })}
          >
            {t('info.unstakingTranches', {
              count: unstakingTokensTranches.length,
            })}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center pb-6">
          <p className="secondary-text">{t('title.unstakedTokens')}</p>
          <p
            className={clsx('font-mono text-xs', {
              'text-icon-interactive-valid': unstakedTokens > 0,
              'secondary-text': unstakedTokens === 0,
            })}
          >
            {unstakedTokens.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            })}{' '}
            ${tokenSymbol}
          </p>
        </div>

        {unstakedTokens > 0 && (
          <Button
            className="mb-2 w-full"
            contentContainerClassName="justify-center"
            disabled={loadingManaging || loadingClaiming}
            loading={loadingClaiming}
            size="lg"
            variant="primary"
          >
            {t('button.claimNumTokens', {
              amount: unstakedTokens.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              }),
              tokenSymbol,
            })}
          </Button>
        )}

        <Button
          className="mb-0 w-full"
          contentContainerClassName="justify-center"
          disabled={loadingClaiming}
          loading={loadingManaging}
          size="lg"
          variant="secondary"
        >
          {t('button.manageStake', { tokenSymbol })}
        </Button>
      </div>

      {openProposals && (
        <div className="py-4 px-6 border-t border-t-border-primary">
          <Button
            className="w-full"
            contentContainerClassName="justify-center"
            disabled={!openProposals || loadingManaging || loadingClaiming}
            showBadge
            size="lg"
            variant="secondary"
          >
            {t('title.openProposals')}
          </Button>
        </div>
      )}
    </ProfileCardWrapper>
  )
}
