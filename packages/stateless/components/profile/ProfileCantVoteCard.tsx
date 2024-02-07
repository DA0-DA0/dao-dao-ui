import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileCardWrapperProps } from '@dao-dao/types'

import { TooltipInfoIcon } from '../tooltip/TooltipInfoIcon'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileCantVoteCardProps
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  daoName: string
  isMember: boolean
  membershipInfo: ReactNode
}

export const ProfileCantVoteCard = ({
  daoName,
  isMember,
  membershipInfo,
  ...wrapperProps
}: ProfileCantVoteCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="!p-0 border-t-0"
      compact
      underHeaderComponent={
        <MembershipPill daoName={daoName} ghost isMember={isMember} />
      }
      {...wrapperProps}
    >
      <div className="border-y border-border-primary p-4">
        <p className="link-text mb-1">{t('title.membership')}</p>

        {membershipInfo}
      </div>

      <div className="p-4">
        <div className="secondary-text flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <p>{t('title.votingPower')}</p>
            <TooltipInfoIcon
              className="text-icon-secondary"
              size="sm"
              title={t('info.votingPowerAtCreationTooltip')}
            />
          </div>

          <p className="font-mono text-text-interactive-disabled">0%</p>
        </div>

        <div className="secondary-text mt-2 flex flex-row items-center justify-between">
          <p>{t('title.vote')}</p>
          <p className="text-text-tertiary">{t('info.none')}</p>
        </div>
      </div>
    </ProfileCardWrapper>
  )
}
