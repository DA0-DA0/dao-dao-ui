import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import { useTranslation } from '@dao-dao/i18n'
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
    <div className="flex flex-wrap gap-4">
      {!!walletWeight && (
        <div className="flex-1">
          <h2
            className={clsx(
              'mb-3',
              primaryText ? 'primary-text' : 'title-text'
            )}
          >
            {t('title.yourVotingPower')}
          </h2>
          <ul className="mt-3 list-none">
            <li>
              <VoteBalanceCard
                addrTitle
                title={walletAddress as string}
                weight={walletWeight}
                weightTotal={totalWeight}
              />
            </li>
          </ul>
        </div>
      )}
      {!!members.length && (
        <div className="flex-1">
          <h2
            className={clsx(
              'mb-3',
              primaryText ? 'primary-text' : 'title-text'
            )}
          >
            {t('title.memberVotingPowers')}
          </h2>
          <ul className="mt-2 list-none">
            {members.map((member) => (
              <li key={member.addr}>
                <VoteBalanceCard
                  addrTitle
                  title={member.addr}
                  weight={member.weight}
                  weightTotal={totalWeight}
                />
              </li>
            ))}
          </ul>
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
    <div className="flex flex-wrap gap-4">
      <div className="flex-1">
        <h2
          className={clsx('mb-3', primaryText ? 'primary-text' : 'title-text')}
        >
          {t('title.yourVotingPower')}
        </h2>

        {loader}
      </div>

      <div className="flex-1">
        <h2
          className={clsx('mb-3', primaryText ? 'primary-text' : 'title-text')}
        >
          {t('title.memberVotingPowers')}
        </h2>

        {loader}
      </div>
    </div>
  )
}
