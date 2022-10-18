import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { Member } from '@dao-dao/tstypes/contracts/CwdVotingCw4'
import {
  Loader as DefaultLoader,
  LoaderProps,
  VoteBalanceCard,
} from '@dao-dao/ui'

export interface MultisigMembersListProps {
  walletAddress?: string
  walletWeight?: number
  members: Member[]
  totalWeight: number
  primaryText?: boolean
}

export const MultisigMemberList = ({
  walletAddress,
  walletWeight,
  members,
  totalWeight,
  primaryText,
}: MultisigMembersListProps) => {
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

export interface MultisigMembersListLoaderProps
  extends Pick<MultisigMembersListProps, 'primaryText'> {
  Loader?: ComponentType<LoaderProps>
}

export const MultisigMemberListLoader = ({
  primaryText,
  Loader = DefaultLoader,
}: MultisigMembersListLoaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3">
        <h2 className={primaryText ? 'primary-text' : 'title-text'}>
          {t('title.yourVotingPower')}
        </h2>

        <Loader />
      </div>

      <div className="space-y-3">
        <h2 className={primaryText ? 'primary-text' : 'title-text'}>
          {t('title.memberVotingPowers')}
        </h2>

        <Loader />
      </div>
    </div>
  )
}
