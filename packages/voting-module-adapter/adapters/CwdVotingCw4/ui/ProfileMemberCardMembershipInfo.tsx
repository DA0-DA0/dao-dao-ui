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
      <div className="flex flex-row justify-between items-center pb-3 secondary-text">
        <p>{t('title.votingPower')}</p>
        <p className="font-mono text-text-primary">
          {formatPercentOf100(votingPower)}
        </p>
      </div>
    </>
  )
}
