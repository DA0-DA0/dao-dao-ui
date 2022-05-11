import clsx from 'clsx'
import { FC } from 'react'

import { VoteBalanceCard } from './multisig'
import { MultisigMemberInfo } from '@/selectors/multisigs'

export interface MultisigMembersListProps {
  visitorAddress: string | undefined
  visitorWeight: number | undefined
  memberList: MultisigMemberInfo[]
  totalWeight: number
  primaryText?: boolean
}

export const MultisigMemberList: FC<MultisigMembersListProps> = ({
  visitorAddress,
  visitorWeight,
  memberList,
  totalWeight,
  primaryText,
}) => (
  <div className="flex flex-wrap gap-4">
    {visitorWeight && (
      <div className="flex-1">
        <h2
          className={clsx('mb-3', primaryText ? 'primary-text' : 'title-text')}
        >
          Your shares
        </h2>
        <ul className="mt-3 list-none">
          <li>
            <VoteBalanceCard
              addrTitle
              title={visitorAddress as string}
              weight={visitorWeight}
              weightTotal={totalWeight}
            />
          </li>
        </ul>
      </div>
    )}
    {memberList.length != 0 && (
      <div className="flex-1">
        <h2
          className={clsx('mb-3', primaryText ? 'primary-text' : 'title-text')}
        >
          Member shares
        </h2>
        <ul className="mt-2 list-none">
          {memberList.map((member) => (
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
