import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileNotMemberCardProps {
  daoName: string
  walletName: string
  profileImgUrl: string
  established: Date
  becomeMemberInfo: ReactNode
}

export const ProfileNotMemberCard = ({
  daoName,
  walletName,
  profileImgUrl,
  established,
  becomeMemberInfo,
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
      <p className="mb-1 link-text">{t('title.membership')}</p>

      {becomeMemberInfo}
    </ProfileCardWrapper>
  )
}
