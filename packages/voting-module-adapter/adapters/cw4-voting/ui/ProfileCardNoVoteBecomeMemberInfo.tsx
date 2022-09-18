import { useTranslation } from 'react-i18next'

export interface ProfileCardNoVoteBecomeMemberInfoProps {
  daoName: string
}

export const ProfileCardNoVoteBecomeMemberInfo = ({
  daoName,
}: ProfileCardNoVoteBecomeMemberInfoProps) => {
  const { t } = useTranslation()

  return (
    <p className="secondary-text">
      {t('info.memberCantVoteMembership', { daoName })}
    </p>
  )
}
