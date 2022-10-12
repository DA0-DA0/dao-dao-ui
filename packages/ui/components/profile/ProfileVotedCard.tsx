import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { formatPercentOf100 } from '@dao-dao/utils'

import { TooltipIcon } from '../TooltipIcon'
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
      <div className="flex flex-row justify-between items-center secondary-text">
        <div className="flex flex-row gap-2 items-center">
          <p>{t('title.votingPower')}</p>
          <TooltipIcon
            className="text-icon-secondary"
            title={t('info.votingPowerAtCreationTooltip')}
          />
        </div>

        <p className="font-mono text-text-primary">
          {formatPercentOf100(votingPower)}
        </p>
      </div>

      <div className="flex flex-row justify-between items-center mt-3 secondary-text">
        <p>{t('title.vote')}</p>
        {vote}
      </div>
    </ProfileCardWrapper>
  )
}
