import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { BaseProfileCardMemberInfoProps, LoadingData } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

export interface ProfileCardMemberInfoProps
  extends Omit<BaseProfileCardMemberInfoProps, 'maxGovernanceTokenDeposit'> {
  daoName: string
  votingPower: LoadingData<number>
}

export const ProfileCardMemberInfo = ({
  daoName,
  votingPower,
  cantVoteOnProposal,
}: ProfileCardMemberInfoProps) => {
  const { t } = useTranslation()

  return votingPower.loading || votingPower.data > 0 ? (
    <div className="secondary-text flex flex-row items-center justify-between pb-3">
      <p>{t('title.votingPower')}</p>
      <p
        className={clsx(
          'font-mono text-text-primary',
          votingPower.loading && 'animate-pulse'
        )}
      >
        {votingPower.loading ? '...' : formatPercentOf100(votingPower.data)}
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
