import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  daoRewardsDistributorExtraQueries,
  daoRewardsDistributorQueries,
  daoRewardsDistributorQueryKeys,
  indexerQueries,
} from '@dao-dao/state/query'
import {
  DaoRewardDistributionInfoModal as StatelessDaoRewardDistributionInfoModal,
  useDaoContext,
} from '@dao-dao/stateless'
import { StatefulDaoRewardDistributionInfoModalProps } from '@dao-dao/types'
import { executeSmartContractWithToken, processError } from '@dao-dao/utils'

import { useQueryLoadingDataWithError, useWallet } from '../../hooks'

export const DaoRewardDistributionInfoModal = (
  props: StatefulDaoRewardDistributionInfoModalProps
) => {
  const { t } = useTranslation()
  const { dao } = useDaoContext()
  const { address, isWalletConnected, getSigningClient } = useWallet()

  // Save reference to past distribution and use it when current distribution is
  // undefined so that the UI doesn't stutter when closing.
  const distributionRef = useRef(props.distribution)
  useEffect(() => {
    if (props.distribution) {
      distributionRef.current = props.distribution
    }
  }, [props.distribution])
  const _distribution = props.distribution ?? distributionRef.current

  const queryClient = useQueryClient()
  // Load individually so we can refresh it on its own.
  const loadingDistribution = useQueryLoadingDataWithError(
    _distribution
      ? daoRewardsDistributorExtraQueries.distribution(queryClient, {
          chainId: dao.chainId,
          address: _distribution.address,
          id: _distribution.id,
        })
      : undefined
  )
  const remaining = useQueryLoadingDataWithError(
    _distribution
      ? daoRewardsDistributorQueries.undistributedRewards({
          chainId: dao.chainId,
          contractAddress: _distribution.address,
          args: {
            id: _distribution.id,
          },
        })
      : undefined,
    HugeDecimal.from
  )

  // Override distribution from props with loaded data so the data is fresh.
  const distribution =
    loadingDistribution.loading || loadingDistribution.errored
      ? _distribution
      : loadingDistribution.data

  const [funding, setFunding] = useState(false)
  const onFund = async (amount: HugeDecimal) => {
    // Should never happen if onFund is being called.
    if (!distribution) {
      toast.error(t('error.loadingData'))
      return false
    }

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

      await Promise.all([
        // Refetch indexer query depended on by contract query.
        queryClient
          .refetchQueries({
            queryKey: indexerQueries.queryContract(queryClient, {
              chainId: dao.chainId,
              contractAddress: distribution.address,
              formula: 'daoRewardsDistributor/distribution',
              args: {
                id: distribution.id,
              },
            }).queryKey,
          })
          .then(() =>
            // Refetch contract query.
            queryClient.refetchQueries({
              queryKey: daoRewardsDistributorQueryKeys.distribution(
                dao.chainId,
                distribution.address,
                {
                  id: distribution.id,
                }
              ),
            })
          )
          .then(() =>
            // Refetch distribution query that uses contract query.
            queryClient.refetchQueries({
              queryKey: daoRewardsDistributorExtraQueries.distribution(
                queryClient,
                {
                  chainId: dao.chainId,
                  address: distribution.address,
                  id: distribution.id,
                }
              ).queryKey,
            })
          ),
        // Refetch contract query depended on by pending rewards query.
        queryClient
          .refetchQueries({
            queryKey: [
              {
                ...daoRewardsDistributorQueryKeys.contract[0],
                method: 'pending_rewards',
              },
            ],
          })
          .then(() =>
            // Refetch pending rewards query that uses contract query.
            queryClient.refetchQueries({
              queryKey: ['daoRewardsDistributorExtra', 'listAllPendingRewards'],
            })
          )
          .then(() =>
            // Refetch DAO pending rewards query that uses pending rewards
            // query.
            queryClient.refetchQueries({
              queryKey: daoRewardsDistributorExtraQueries.pendingDaoRewards(
                queryClient,
                {
                  chainId: dao.chainId,
                  daoAddress: dao.coreAddress,
                  recipient: address,
                }
              ).queryKey,
            })
          ),
        // Refetch rewards remaining query.
        queryClient.refetchQueries({
          queryKey: daoRewardsDistributorQueries.undistributedRewards({
            chainId: dao.chainId,
            contractAddress: distribution.address,
            args: {
              id: distribution.id,
            },
          }).queryKey,
        }),
      ])

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

  return (
    <StatelessDaoRewardDistributionInfoModal
      {...props}
      distribution={distribution}
      funding={funding}
      onFund={onFund}
      remaining={remaining}
      visible={
        // Only show when distribution passed via props is defined.
        !!props.distribution
      }
    />
  )
}
