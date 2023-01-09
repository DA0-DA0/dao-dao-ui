import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../buttons'
import { MembershipPill } from './MembershipPill'
import {
  ProfileCardWrapper,
  ProfileCardWrapperProps,
} from './ProfileCardWrapper'

// Represents a tranch of tokens that is currently unstaking and will become
// available at some well-known later date.
export interface UnstakingTokensTranch {
  tokenSymbol: string
  unstakingTokens: number
  available: Date
}

export interface ProfileMemberCardProps
  extends Omit<
    ProfileCardWrapperProps,
    'children' | 'underHeaderComponent' | 'childContainerClassName' | 'compact'
  > {
  loadingClaiming?: boolean
  loadingManaging?: boolean
  daoName: string
  openProposals?: boolean
  membershipInfo: ReactNode
}

export const ProfileMemberCard = ({
  loadingClaiming,
  loadingManaging,
  daoName,
  openProposals,
  membershipInfo,
  ...wrapperProps
}: ProfileMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      underHeaderComponent={<MembershipPill daoName={daoName} isMember />}
      {...wrapperProps}
    >
      <div className="border-t border-t-border-primary p-6 pb-4">
        <p className="link-text mb-3">{t('title.yourMembership')}</p>

        {membershipInfo}
      </div>

      {openProposals && (
        <div className="border-t border-t-border-primary py-4 px-6">
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
