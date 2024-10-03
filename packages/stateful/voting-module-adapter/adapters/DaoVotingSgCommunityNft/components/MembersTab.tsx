import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { daoVotingSgCommunityNftExtraQueries } from '@dao-dao/state'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { votingModule } = useVotingModuleAdapterOptions()

  const queryClient = useQueryClient()
  const members = useQueryLoadingDataWithError(
    daoVotingSgCommunityNftExtraQueries.allVoters(queryClient, {
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
