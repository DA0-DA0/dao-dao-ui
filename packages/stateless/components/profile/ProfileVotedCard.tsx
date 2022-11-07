import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { formatPercentOf100 } from '@dao-dao/utils'

import { TooltipInfoIcon } from '../tooltip/TooltipInfoIcon'
import { MembershipPill } from './MembershipPill'
import {
  ProfileCardWrapper,
  ProfileCardWrapperProps,
} from './ProfileCardWrapper'

export interface ProfileVotedCardProps
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  votingPower: number
  daoName: string
  vote: ReactNode
}

export const ProfileVotedCard = ({
  votingPower,
  daoName,
  vote,
  ...wrapperProps
}: ProfileVotedCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      compact
      underHeaderComponent={<MembershipPill daoName={daoName} ghost isMember />}
      {...wrapperProps}
    >
      <div className="secondary-text flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <p>{t('title.votingPower')}</p>
          <TooltipInfoIcon
            className="text-icon-secondary"
            size="sm"
            title={t('info.votingPowerAtCreationTooltip')}
          />
        </div>

        <p className="font-mono text-text-primary">
          {formatPercentOf100(votingPower)}
        </p>
      </div>

      <div className="secondary-text mt-3 flex flex-row items-center justify-between">
        <p>{t('title.vote')}</p>
        {vote}
      </div>
    </ProfileCardWrapper>
  )
}
