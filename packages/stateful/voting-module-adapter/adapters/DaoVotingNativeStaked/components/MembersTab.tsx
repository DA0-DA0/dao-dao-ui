import { useTranslation } from 'react-i18next'

import { DaoVotingNativeStakedSelectors } from '@dao-dao/state/recoil'
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
  const { token } = useGovernanceTokenInfo()

  const members = useCachedLoadingWithError(
    DaoVotingNativeStakedSelectors.topStakersSelector({
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
            unit: '$' + token.symbol,
            value: {
              loading: false,
              data: convertMicroDenomToDenomWithDecimals(
                balance,
                token.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: token.decimals,
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
