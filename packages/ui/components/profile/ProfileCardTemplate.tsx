import { useTranslation } from 'react-i18next'

import { MembershipPill } from './MembershipPill'
import { ProfileImage } from './ProfileImage'

export interface ProfileCardTemplateProps {
  children: any
  imgUrl: string
  walletName: string
  dateEstablished: Date
  isMember: boolean
  daoName: string
}
export const ProfileCardTemplate = ({
  children,
  imgUrl,
  walletName,
  dateEstablished,
  isMember,
  daoName,
}: ProfileCardTemplateProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-lg border-2 border-border-primary">
      <ProfileImage imgUrl={imgUrl} />
      <div className="pt-6 title-text">{walletName}</div>
      <div className="py-2 mb-4 font-mono caption-text">
        {t('profile.est')}
        {new Intl.DateTimeFormat('default', {
          month: 'long',
          day: undefined,
          year: 'numeric',
        }).format(dateEstablished)}
      </div>
      <MembershipPill daoName={daoName} isMember={isMember} />
      {children}
    </div>
  )
}
