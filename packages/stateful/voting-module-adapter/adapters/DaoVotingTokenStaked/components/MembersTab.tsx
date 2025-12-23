import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { NativeStakedVotingModule } from '@dao-dao/state/clients'
import { daoVotingTokenStakedExtraQueries } from '@dao-dao/state/query'
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
import { useEntityMap, useQueryLoadingDataWithError } from '../../../../hooks'
import { useGovernanceTokenInfo } from '../hooks/useGovernanceTokenInfo'

export const MembersTab = () => {
  const { t } = useTranslation()
  const votingModule = useVotingModule()
  const { governanceToken } = useGovernanceTokenInfo()

  const members = useQueryLoadingDataWithError(
    daoVotingTokenStakedExtraQueries.topStakers({
      chainId: votingModule.chainId,
      address: votingModule.address,
      legacyNativeStaked: votingModule instanceof NativeStakedVotingModule,
    }),
    (data) =>
      data?.map(
        ({
          address,
          balance,
          votingPowerPercent,
        }: any): StatefulDaoMemberCardProps => ({
          address,
          balanceLabel: t('title.staked'),
          balance: {
            loading: false,
            data: {
              amount: HugeDecimal.from(balance),
              token: governanceToken,
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
