import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  daoRewardsDistributorExtraQueries,
  daoRewardsDistributorQueryKeys,
} from '@dao-dao/state/query'
import {
  DaoRewardsDistributorFundCard as StatelessDaoRewardsDistributorFundCard,
  useDaoContext,
} from '@dao-dao/stateless'
import {
  DaoRewardDistribution,
  StatefulDaoRewardsDistributorFundCardProps,
} from '@dao-dao/types'
import { executeSmartContractWithToken, processError } from '@dao-dao/utils'

import { useQueryLoadingDataWithError, useWallet } from '../../hooks'

export const DaoRewardsDistributorFundCard = (
  props: StatefulDaoRewardsDistributorFundCardProps
) => {
  const { t } = useTranslation()
  const { dao } = useDaoContext()
  const { address, isWalletConnected, getSigningClient } = useWallet()

  const queryClient = useQueryClient()
  const distributions = useQueryLoadingDataWithError(
    daoRewardsDistributorExtraQueries.allDistributions(queryClient, {
      chainId: dao.chainId,
      daoAddress: dao.coreAddress,
    }),
    (distributions) => distributions.filter(({ open_funding }) => open_funding)
  )

  const [funding, setFunding] = useState(false)
  const onFund = async (
    distribution: DaoRewardDistribution,
    amount: HugeDecimal
  ) => {
    if (!isWalletConnected || !address) {
      toast.error(t('error.logInToContinue'))
      return false
    }

    if (!amount.isPositive()) {
      toast.error(t('error.cannotDistributeZeroTokens'))
      return false
    }

    setFunding(true)
    try {
      await executeSmartContractWithToken({
        client: getSigningClient,
        sender: address,
        contractAddress: distribution.address,
        msg: {
          fund: {
            id: distribution.id,
          },
        },
        token: distribution.token,
        amount,
      })

      //! Refresh pending rewards...

      // Refetch contract queries depended on by pending rewards query.
      await queryClient.refetchQueries({
        queryKey: [
          {
            ...daoRewardsDistributorQueryKeys.contract[0],
            method: 'pending_rewards',
          },
        ],
      })

      await queryClient.refetchQueries({
        queryKey: ['daoRewardsDistributorExtra', 'listAllPendingRewards'],
      })

      // Refetch pending rewards query.
      await queryClient.refetchQueries({
        queryKey: daoRewardsDistributorExtraQueries.pendingDaoRewards(
          queryClient,
          {
            chainId: dao.chainId,
            daoAddress: dao.coreAddress,
            recipient: address,
          }
        ).queryKey,
      })

      toast.success(t('success.distributedRewards'))

      return true
    } catch (error) {
      console.error(error)
      toast.error(processError(error))

      return false
    } finally {
      setFunding(false)
    }
  }

  if (
    !distributions.loading &&
    !distributions.errored &&
    distributions.data.length === 0
  ) {
    return null
  }

  return (
    <StatelessDaoRewardsDistributorFundCard
      {...props}
      distributions={distributions}
      funding={funding}
      onFund={onFund}
    />
  )
}
