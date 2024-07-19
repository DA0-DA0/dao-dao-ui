import { useTranslation } from 'react-i18next'

import { DaoVotingCw20StakedSelectors } from '@dao-dao/state'
import {
  TokenAmountDisplay,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'
import {
  convertDenomToMicroDenomWithDecimals,
  convertDurationToHumanReadableString,
  formatPercentOf100,
  isSecretNetwork,
} from '@dao-dao/utils'

import { useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'
import { useStakingInfo } from './useStakingInfo'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const { totalVotingWeight } = useMembership()

  const { unstakingDuration } = useStakingInfo()

  const {
    governanceToken: { decimals, symbol },
    supply,
  } = useGovernanceTokenInfo()

  const loadingMembers = useCachedLoadingWithError(
    DaoVotingCw20StakedSelectors.topStakersSelector({
      chainId,
      contractAddress: votingModuleAddress,
    })
  )

  return [
    // Can't view members on Secret Network.
    ...(isSecretNetwork(chainId)
      ? []
      : [
          {
            label: t('title.members'),
            tooltip: t('info.membersTooltip'),
            loading: loadingMembers.loading,
            value: loadingMembers.loading
              ? undefined
              : loadingMembers.errored
              ? '<error>'
              : loadingMembers.data?.length ?? '<error>',
          },
        ]),
    {
      label: t('title.totalSupply'),
      tooltip: t('info.totalSupplyTooltip', {
        tokenSymbol: symbol,
      }),
      value: (
        <TokenAmountDisplay
          amount={supply}
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
    {
      label: t('title.totalStaked'),
      tooltip: t('info.totalStakedTooltip', {
        tokenSymbol: symbol,
      }),
      loading: totalVotingWeight === undefined,
      value:
        totalVotingWeight === undefined
          ? undefined
          : formatPercentOf100(
              (totalVotingWeight /
                convertDenomToMicroDenomWithDecimals(supply, decimals)) *
                100
            ),
    },
    {
      label: t('title.unstakingPeriod'),
      tooltip: t('info.unstakingPeriodTooltip', {
        tokenSymbol: symbol,
      }),
      value: unstakingDuration
        ? convertDurationToHumanReadableString(t, unstakingDuration)
        : t('info.none'),
    },
  ]
}
