import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipIcon } from '../TooltipIcon'
import { MembershipPill } from './MembershipPill'
import {
  ProfileCardWrapper,
  ProfileCardWrapperProps,
} from './ProfileCardWrapper'

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
  notMemberInfo: ReactNode
}

export const ProfileCantVoteCard = ({
  daoName,
  isMember,
  notMemberInfo,
  ...wrapperProps
}: ProfileCantVoteCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      compact
      underHeaderComponent={
        <MembershipPill daoName={daoName} ghost isMember={isMember} />
      }
      {...wrapperProps}
    >
      <div className="border-t border-t-border-primary p-6">
        <div className="secondary-text flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <p>{t('title.votingPower')}</p>
            <TooltipIcon
              className="text-icon-secondary"
              title={t('info.votingPowerAtCreationTooltip')}
            />
          </div>

          <p className="font-mono text-text-interactive-disabled">0%</p>
        </div>

        <div className="secondary-text mt-3 flex flex-row items-center justify-between">
          <p>{t('title.vote')}</p>
          <p className="text-text-tertiary">{t('info.none')}</p>
        </div>
      </div>

      <div className="border-t border-t-border-primary p-6">
        <p className="link-text mb-1">{t('title.membership')}</p>

        {notMemberInfo}
      </div>
    </ProfileCardWrapper>
  )
}
