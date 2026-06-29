import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import {
  LoadingDataWithError,
  StatefulDaoMemberCardProps,
} from '@dao-dao/types'
import { humanReadableList } from '@dao-dao/utils'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useDaoGovernanceToken, useEntityMap } from '../../../../hooks'
import { useCw721RolesMembers } from '../hooks'

export const MembersTab = () => {
  const { t } = useTranslation()
  const token = useDaoGovernanceToken() ?? undefined
  const cw721RolesMembers = useCw721RolesMembers()

  const members: LoadingDataWithError<StatefulDaoMemberCardProps[]> =
    cw721RolesMembers.loading
      ? { loading: true, errored: false }
      : cw721RolesMembers.errored
        ? {
            loading: false,
            errored: true,
            error: cw721RolesMembers.error,
          }
        : {
            loading: false,
            errored: false,
            data: cw721RolesMembers.data.map((member) => {
              const totalVotingWeight = cw721RolesMembers.data.reduce(
                (sum, { weight }) => sum.plus(weight),
                HugeDecimal.zero
              )

              return {
                address: member.address,
                balanceLabel: member.roles.length
                  ? humanReadableList(member.roles)
                  : t('title.votingWeight'),
                balance: {
                  loading: false,
                  data: {
                    amount: member.weight,
                    token,
                  },
                },
                votingPowerPercent: {
                  loading: false,
                  data: totalVotingWeight.isZero()
                    ? 0
                    : member.weight
                        .div(totalVotingWeight)
                        .times(100)
                        .toNumber(),
                },
              }
            }),
          }

  const { map: entityMap } = useEntityMap({
    addresses:
      members.loading || members.errored
        ? []
        : members.data.map((member) => member.address),
  })

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      entityMap={entityMap}
      members={members}
      topVoters={{
        show: true,
        EntityDisplay,
      }}
    />
  )
}
