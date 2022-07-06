import { useTranslation } from 'next-i18next'
import { FC, ReactNode } from 'react'

import { Member } from '@dao-dao/state/clients/cw4-voting'
import { VoteBalanceCard } from '@dao-dao/ui'

export interface MultisigMembersListProps {
  walletAddress?: string
  walletWeight?: number
  members: Member[]
  totalWeight: number
  primaryText?: boolean
}

export const MultisigMemberList: FC<MultisigMembersListProps> = ({
  walletAddress,
  walletWeight,
  members,
  totalWeight,
  primaryText,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      {!!walletWeight && (
        <div className="space-y-3">
          <h2 className={primaryText ? 'primary-text' : 'title-text'}>
            {t('title.yourVotingPower')}
          </h2>

          <VoteBalanceCard
            addrTitle
            title={walletAddress as string}
            weight={walletWeight}
            weightTotal={totalWeight}
          />
        </div>
      )}

      {!!members.length && (
        <div className="space-y-3">
          <h2 className={primaryText ? 'primary-text' : 'title-text'}>
            {t('title.memberVotingPowers')}
          </h2>

          {members.map((member) => (
            <VoteBalanceCard
              key={member.addr}
              addrTitle
              title={member.addr}
              weight={member.weight}
              weightTotal={totalWeight}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MultisigMembersListLoaderProps
  extends Pick<MultisigMembersListProps, 'primaryText'> {
  loader: ReactNode
}

export const MultisigMemberListLoader: FC<MultisigMembersListLoaderProps> = ({
  primaryText,
  loader,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3">
        <h2 className={primaryText ? 'primary-text' : 'title-text'}>
          {t('title.yourVotingPower')}
        </h2>

        {loader}
      </div>

      <div className="space-y-3">
        <h2 className={primaryText ? 'primary-text' : 'title-text'}>
          {t('title.memberVotingPowers')}
        </h2>

        {loader}
      </div>
    </div>
  )
}
