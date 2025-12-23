import { useTranslation } from 'react-i18next'

import { daoVotingSgCommunityNftExtraQueries } from '@dao-dao/state'
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
  useEntityNameMap,
  useQueryLoadingDataWithError,
} from '../../../../hooks'

export const MembersTab = () => {
  const { t } = useTranslation()
  const votingModule = useVotingModule()

  const members = useQueryLoadingDataWithError(
    daoVotingSgCommunityNftExtraQueries.allVoters({
      chainId: votingModule.chainId,
      address: votingModule.address,
    }),
    (data) =>
      data?.map(
        ({
          address,
          weight,
          votingPowerPercent,
        }): StatefulDaoMemberCardProps => ({
          address,
          balanceLabel: t('title.votingWeight'),
          balance: {
            loading: false,
            data: {
              amount: weight,
            },
          },
          votingPowerPercent: {
            loading: false,
            data: votingPowerPercent,
          },
        })
      ) ?? []
  )

  const { map: memberNameMap } = useEntityNameMap({
    addresses:
      members.loading || members.errored
        ? []
        : members.data.map((member) => member.address),
  })

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      memberNameMap={memberNameMap}
      members={members}
      topVoters={{
        show: true,
        EntityDisplay,
      }}
    />
  )
}
