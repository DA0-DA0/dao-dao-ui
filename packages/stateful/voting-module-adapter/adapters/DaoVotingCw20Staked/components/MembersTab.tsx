import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { indexerQueries } from '@dao-dao/state/query'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from '../hooks/useGovernanceTokenInfo'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const { governanceToken } = useGovernanceTokenInfo()

  const queryClient = useQueryClient()
  const members = useQueryLoadingDataWithError(
    indexerQueries.queryContract(queryClient, {
      chainId,
      contractAddress: votingModuleAddress,
      formula: 'daoVotingCw20Staked/topStakers',
      noFallback: true,
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
              token: governanceToken,
              amount: HugeDecimal.from(balance).toHumanReadableNumber(
                governanceToken.decimals
              ),
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
