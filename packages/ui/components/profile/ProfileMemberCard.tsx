import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

import { ProfileCardWrapper } from './ProfileCardWrapper'

// Represents a tranch of tokens that is currently unstaking and will become
// available at some well-known later date.
export interface UnstakingTokensTranch {
  tokenSymbol: string
  unstakingTokens: number
  available: Date
}

export interface ProfileMemberCardProps {
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
}

export const ProfileMemberCard = ({
  votingPower,
  daoName,
  walletName,
  profileImgUrl,
  tokenSymbol,
  stakedTokens,
  tokenDecimals,
  unstakingTokensTranches,
  unstakedTokens,
  openProposals
}: ProfileMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      daoName={daoName}
      imgUrl={profileImgUrl}
      isMember
      walletName={walletName}
    >

      <div className = "py-3 px-6 border-t border-t-border-primary">
        <div className="flex flex-row justify-between items-center pb-3 text-xs text-bold">
          <p>{t('title.yourEquity')}</p>
        </div>

        <div className="flex flex-row justify-between items-center secondary-text pb-3">
          <p>{t('title.stakedTokens')}</p>
          <p className="font-mono text-text-primary">
          {stakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '} ${tokenSymbol}</p>
        </div>

        <div className="flex flex-row justify-between items-center secondary-text pb-3">
          <p>{t('title.votingPower')}</p>
          <p className="font-mono text-text-primary">{votingPower}%</p>
        </div>

        <div className="flex flex-row justify-between items-center secondary-text pb-3">
          <p>{t('title.unstakingTokens')}</p>
          <p className="font-mono text-text-primary underline underline-offset-4">
          {t('info.unstakingTranches', { numTranches: unstakingTokensTranches.length })}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center pb-6">
          <p className="secondary-text">Available tokens</p>
          <p className="font-mono text-xs text-icon-interactive-valid">
          {unstakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '} ${tokenSymbol}</p>
        </div>

        <Button
          className="mb-2 w-full"
          contentContainerClassName="justify-center"
          size="lg"
          variant="primary"
        >
          {t('button.claimNumTokens', {
            amount: unstakedTokens.toLocaleString(undefined, {maximumFractionDigits: tokenDecimals}),
            tokenSymbol,
          })}
        </Button>

        <Button
          className="mb-0 w-full"
          contentContainerClassName="justify-center primary-text"
          size="lg"
          variant="secondary"
        >
        {t('button.manageStake', { tokenSymbol })}
        </Button>
      </div>

      <div className = "py-3 px-6 border-t border-t-border-primary">
        <Button
          className='w-full'
          contentContainerClassName="justify-center primary-text"
          size="lg"
          variant="secondary"
        >
         {t('title.openProposals')}
          <div
            className="absolute top-1 right-1 w-2 h-2 bg-[#B3A0FF] border border-3 border-black rounded-full"></div>
        </Button>
      </div>

    </ProfileCardWrapper>
  )
}
