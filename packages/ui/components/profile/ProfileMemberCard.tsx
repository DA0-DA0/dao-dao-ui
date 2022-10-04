import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

// Represents a tranch of tokens that is currently unstaking and will become
// available at some well-known later date.
export interface UnstakingTokensTranch {
  tokenSymbol: string
  unstakingTokens: number
  available: Date
}

export interface ProfileMemberCardProps {
  loadingClaiming?: boolean
  loadingManaging?: boolean
  daoName: string
  walletAddress: string
  walletName: string
  profileImageUrl: string | undefined | null
  openProposals?: boolean
  established: Date
  membershipInfo: ReactNode
}

export const ProfileMemberCard = ({
  loadingClaiming,
  loadingManaging,
  daoName,
  walletAddress,
  walletName,
  profileImageUrl,
  openProposals,
  established,
  membershipInfo,
}: ProfileMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      established={established}
      imgUrl={profileImageUrl}
      underHeaderComponent={<MembershipPill daoName={daoName} isMember />}
      walletAddress={walletAddress}
      walletName={walletName}
    >
      <div className="p-6 pb-4 border-t border-t-border-primary">
        <p className="mb-3 link-text">{t('title.yourMembership')}</p>

        {membershipInfo}
      </div>

      {openProposals && (
        <div className="py-4 px-6 border-t border-t-border-primary">
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
