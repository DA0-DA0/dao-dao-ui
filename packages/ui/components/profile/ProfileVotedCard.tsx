import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipIcon } from '../TooltipIcon'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileVotedCardProps {
  votingPower: number
  daoName: string
  walletAddress: string
  walletName: string
  profileImageUrl: string | undefined | null
  vote: ReactNode
}

export const ProfileVotedCard = ({
  votingPower,
  daoName,
  walletAddress,
  walletName,
  profileImageUrl,
  vote,
}: ProfileVotedCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      compact
      imgUrl={profileImageUrl}
      underHeaderComponent={<MembershipPill daoName={daoName} ghost isMember />}
      walletAddress={walletAddress}
      walletName={walletName}
    >
      <div className="flex flex-row justify-between items-center secondary-text">
        <div className="flex flex-row gap-2 items-center">
          <p>{t('title.votingPower')}</p>
          <TooltipIcon
            className="text-icon-secondary"
            title={t('info.votingPowerAtCreationTooltip')}
          />
        </div>

        <p className="font-mono text-text-primary">{votingPower}%</p>
      </div>

      <div className="flex flex-row justify-between items-center mt-3 secondary-text">
        <p>{t('title.vote')}</p>
        {vote}
      </div>
    </ProfileCardWrapper>
  )
}
