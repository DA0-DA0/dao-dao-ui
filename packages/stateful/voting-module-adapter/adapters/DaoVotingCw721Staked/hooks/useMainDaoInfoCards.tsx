import { useTranslation } from 'react-i18next'

import { daoVotingCw721StakedExtraQueries } from '@dao-dao/state'
import { TokenAmountDisplay, useVotingModule } from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'
import {
  convertDurationToHumanReadableString,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../../../hooks'
import { canListCw721StakedMembers } from '../utils'
import { useGovernanceCollectionInfo } from './useGovernanceCollectionInfo'
import { useStakingInfo } from './useStakingInfo'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()
  const votingModule = useVotingModule()

  const { loadingTotalStakedValue, unstakingDuration } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (loadingTotalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const {
    collectionInfo: { symbol, totalSupply },
  } = useGovernanceCollectionInfo()

  const canListMembers = canListCw721StakedMembers(votingModule.chainId)
  const loadingMembers = useQueryLoadingDataWithError(
    canListMembers
      ? daoVotingCw721StakedExtraQueries.topStakers({
          chainId: votingModule.chainId,
          address: votingModule.address,
        })
      : undefined
  )

  return [
    // Members can only be listed via the indexer, and not on Secret Network.
    ...(!canListMembers
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
                : (loadingMembers.data.length ?? '<error>'),
          },
        ]),
    {
      label: t('title.totalSupply'),
      tooltip: t('info.totalSupplyTooltip', {
        tokenSymbol: symbol,
      }),
      value: (
        <TokenAmountDisplay amount={totalSupply} decimals={0} symbol={symbol} />
      ),
    },
    {
      label: t('title.totalStaked'),
      tooltip: t('info.totalStakedTooltip', {
        tokenSymbol: symbol,
      }),
      value: (
        <TokenAmountDisplay
          amount={loadingTotalStakedValue}
          decimals={0}
          suffix={
            loadingTotalStakedValue.loading
              ? undefined
              : ` (${formatPercentOf100(
                  loadingTotalStakedValue.data
                    .div(totalSupply)
                    .times(100)
                    .toNumber()
                )})`
          }
          suffixClassName="text-text-secondary"
          symbol={symbol}
        />
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
