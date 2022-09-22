import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipIcon } from '../TooltipIcon'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileCantVoteCardProps {
  daoName: string
  walletAddress: string
  walletName: string
  profileImgUrl: string | undefined | null
  isMember: boolean
  notMemberInfo: ReactNode
}

export const ProfileCantVoteCard = ({
  daoName,
  walletAddress,
  walletName,
  profileImgUrl,
  isMember,
  notMemberInfo,
}: ProfileCantVoteCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      compact
      imgUrl={profileImgUrl}
      underHeaderComponent={
        <MembershipPill daoName={daoName} ghost isMember={isMember} />
      }
      walletAddress={walletAddress}
      walletName={walletName}
    >
      <div className="p-6 border-t border-t-border-primary">
        <div className="flex flex-row justify-between items-center secondary-text">
          <div className="flex flex-row gap-2 items-center">
            <p>{t('title.votingPower')}</p>
            <TooltipIcon
              className="text-icon-secondary"
              title={t('info.votingPowerAtCreationTooltip')}
            />
          </div>

          <p className="font-mono text-text-interactive-disabled">0%</p>
        </div>

        <div className="flex flex-row justify-between items-center mt-3 secondary-text">
          <p>{t('title.vote')}</p>
          <p className="text-text-tertiary">{t('info.none')}</p>
        </div>
      </div>

      <div className="p-6 border-t border-t-border-primary">
        <p className="mb-1 link-text">{t('title.membership')}</p>

        {notMemberInfo}
      </div>
    </ProfileCardWrapper>
  )
}
