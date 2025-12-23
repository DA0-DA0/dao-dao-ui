import { useTranslation } from 'react-i18next'

import { daoVotingCw721StakedExtraQueries } from '@dao-dao/state/query'
import {
  MembersTab as StatelessMembersTab,
  useVotingModule,
} from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import {
  useDaoGovernanceToken,
  useEntityMap,
  useQueryLoadingDataWithError,
} from '../../../../hooks'

export const MembersTab = () => {
  const { t } = useTranslation()
  const votingModule = useVotingModule()
  const token = useDaoGovernanceToken() ?? undefined

  const members = useQueryLoadingDataWithError(
    daoVotingCw721StakedExtraQueries.topStakers({
      chainId: votingModule.chainId,
      address: votingModule.address,
    }),
    (data) =>
      data?.map(
        ({
          address,
          count,
          votingPowerPercent,
        }): StatefulDaoMemberCardProps => ({
          address,
          balanceLabel: t('title.staked'),
          balance: {
            loading: false,
            data: {
              amount: count,
              token,
            },
          },
          votingPowerPercent: {
            loading: false,
            data: votingPowerPercent,
          },
        })
      ) ?? []
  )

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
