import { useTranslation } from 'react-i18next'

import { DaoVotingCw20StakedSelectors } from '@dao-dao/state/recoil'
import {
  MembersTab as StatelessMembersTab,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from '../hooks/useGovernanceTokenInfo'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const { governanceToken } = useGovernanceTokenInfo()

  const members = useCachedLoadingWithError(
    DaoVotingCw20StakedSelectors.topStakersSelector({
      chainId,
      contractAddress: votingModuleAddress,
    }),
    (data) =>
      data?.map(
        ({
          address,
          balance,
          votingPowerPercent,
        }): StatefulDaoMemberCardProps => ({
          address,
          balanceLabel: t('title.staked'),
          balance: {
            loading: false,
            data: {
              token: governanceToken,
              amount: convertMicroDenomToDenomWithDecimals(
                balance,
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
