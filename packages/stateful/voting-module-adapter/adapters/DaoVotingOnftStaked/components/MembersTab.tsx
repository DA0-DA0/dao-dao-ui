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
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useCommonGovernanceTokenInfo } from '../hooks'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const token = useCommonGovernanceTokenInfo()

  const queryClient = useQueryClient()
  const members = useQueryLoadingDataWithError(
    daoVotingOnftStakedExtraQueries.topStakers(queryClient, {
      chainId,
      address: votingModuleAddress,
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
