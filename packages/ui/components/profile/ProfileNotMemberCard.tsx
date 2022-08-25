import { useTranslation } from 'react-i18next'

import { Cw20StakedBalanceVotingProfileMembership } from './Cw20StakedBalanceVotingProfileMembership'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileNotMemberCardProps {
  tokenSymbol: string
  unstakedTokenBalance: number
  daoName: string
  walletName: string
  profileImgUrl: string
  established: Date
  onStake: () => void
}

export const ProfileNotMemberCard = ({
  tokenSymbol,
  unstakedTokenBalance,
  daoName,
  walletName,
  profileImgUrl,
  established,
  onStake,
}: ProfileNotMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      established={established}
      imgUrl={profileImgUrl}
      underHeaderComponent={
        <MembershipPill daoName={daoName} isMember={false} />
      }
      walletName={walletName}
    >
      <Cw20StakedBalanceVotingProfileMembership
        junoswapHref="https://junoswap.com"
        onStake={onStake}
        stakedTokenBalance={0}
        tokenSymbol={tokenSymbol}
        unstakedTokenBalance={unstakedTokenBalance}
      >
        {t('profile.notMember.stakeYourTokens', { tokenSymbol, daoName })}
      </Cw20StakedBalanceVotingProfileMembership>
    </ProfileCardWrapper>
  )
}
