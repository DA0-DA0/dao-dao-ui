import { useTranslation } from 'react-i18next'

import { TooltipIcon } from '../TooltipIcon'
import { Cw20StakedBalanceVotingProfileMembership } from './Cw20StakedBalanceVotingProfileMembership'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileCantVoteCardProps {
  daoName: string
  walletName: string
  profileImgUrl: string
  tokenSymbol: string
  unstakedTokenBalance: number
  stakedTokenBalance: number
  onStake: () => void
}

export const ProfileCantVoteCard = ({
  daoName,
  walletName,
  profileImgUrl,
  tokenSymbol,
  unstakedTokenBalance,
  stakedTokenBalance,
  onStake,
}: ProfileCantVoteCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      compact
      daoName={daoName}
      imgUrl={profileImgUrl}
      isMember={stakedTokenBalance > 0}
      walletName={walletName}
    >
      <div className="p-6 border-t border-t-border-primary">
        <div className="flex flex-row justify-between items-center secondary-text">
          <div className="flex flex-row gap-2 items-center">
            <p>{t('title.votingPower')}</p>
            <TooltipIcon
              className="text-icon-secondary"
              label={t('info.votingPowerAtCreationTooltip')}
            />
          </div>

          <p className="font-mono text-text-interactive-disabled">0%</p>
        </div>

        <div className="flex flex-row justify-between items-center mt-3 secondary-text">
          <p>{t('title.vote')}</p>
          <p className="text-text-interactive-error">{t('info.none')}</p>
        </div>
      </div>

      <Cw20StakedBalanceVotingProfileMembership
        className="p-6 border-t border-t-border-primary"
        junoswapHref="https://junoswap.com"
        onStake={onStake}
        stakedTokenBalance={stakedTokenBalance}
        tokenSymbol={tokenSymbol}
        unstakedTokenBalance={unstakedTokenBalance}
      >
        {/* If currently has a staked token balance but cannot vote (since this card is indicating that they cannot vote on a proposal), this means they did not have voting power at the time of proposal creation. */}
        {stakedTokenBalance > 0
          ? t('profile.memberCantVote', { tokenSymbol, daoName })
          : t('profile.notMember.stakeYourTokens', { tokenSymbol, daoName })}
      </Cw20StakedBalanceVotingProfileMembership>
    </ProfileCardWrapper>
  )
}
