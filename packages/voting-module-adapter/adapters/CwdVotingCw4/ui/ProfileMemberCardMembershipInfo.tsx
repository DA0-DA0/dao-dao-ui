import { useTranslation } from 'react-i18next'

import { formatPercentOf100 } from '@dao-dao/utils'

export interface ProfileMemberCardMembershipInfoProps {
  votingPower: number
}

export const ProfileMemberCardMembershipInfo = ({
  votingPower,
}: ProfileMemberCardMembershipInfoProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="secondary-text flex flex-row items-center justify-between pb-3">
        <p>{t('title.votingPower')}</p>
        <p className="text-text-primary font-mono">
          {formatPercentOf100(votingPower)}
        </p>
      </div>
    </>
  )
}
