import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { daoVotingOnftStakedExtraQueries } from '@dao-dao/state'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import {
  useDaoGovernanceToken,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { votingModule } = useVotingModuleAdapterOptions()
  const token = useDaoGovernanceToken() ?? undefined

  const queryClient = useQueryClient()
  const members = useQueryLoadingDataWithError(
    daoVotingOnftStakedExtraQueries.topStakers(queryClient, {
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

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      members={members}
      topVoters={{
        show: true,
        EntityDisplay,
      }}
    />
  )
}
