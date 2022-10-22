import { useTranslation } from 'react-i18next'

import { formatPercentOf100 } from '@dao-dao/utils'

import { BaseProfileCardMemberInfoProps } from '../../../types'

export interface ProfileCardMemberInfoProps
  extends Omit<BaseProfileCardMemberInfoProps, 'deposit'> {
  daoName: string
  votingPower: number
}

export const ProfileCardMemberInfo = ({
  daoName,
  votingPower,
  cantVoteOnProposal,
}: ProfileCardMemberInfoProps) => {
  const { t } = useTranslation()

  return votingPower > 0 ? (
    <div className="secondary-text flex flex-row items-center justify-between pb-3">
      <p>{t('title.votingPower')}</p>
      <p className="font-mono text-text-primary">
        {formatPercentOf100(votingPower)}
      </p>
    </div>
  ) : (
    <p className="secondary-text">
      {t('info.membershipDaoNotMemberInfo', {
        daoName,
        context: cantVoteOnProposal ? 'proposal' : 'dao',
      })}
    </p>
  )
}
