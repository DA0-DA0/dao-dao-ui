import { useTranslation } from 'react-i18next'

import { DaoVotingTokenStakedSelectors } from '@dao-dao/state/recoil'
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
    DaoVotingTokenStakedSelectors.topStakersSelector({
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
          balance: {
            label: t('title.staked'),
            unit: '$' + governanceToken.symbol,
            value: {
              loading: false,
              data: convertMicroDenomToDenomWithDecimals(
                balance,
                governanceToken.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: governanceToken.decimals,
              }),
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
