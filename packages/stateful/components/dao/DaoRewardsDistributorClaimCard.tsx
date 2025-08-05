import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { daoRewardsDistributorExtraQueries } from '@dao-dao/state/query'
import {
  DaoRewardsDistributorClaimCard as StatelessDaoRewardsDistributorClaimCard,
  useDao,
  useDependencyTrackedQueryClient,
} from '@dao-dao/stateless'
import { StatefulDaoRewardsDistributorClaimCardProps } from '@dao-dao/types'
import { executeSmartContracts, processError } from '@dao-dao/utils'

import { useQueryLoadingDataWithError, useWallet } from '../../hooks'

export const DaoRewardsDistributorClaimCard = (
  props: StatefulDaoRewardsDistributorClaimCardProps
) => {
  const { t } = useTranslation()
  const dao = useDao()
  const { address, isWalletConnected, getSigningClient } = useWallet()

  const queryClient = useDependencyTrackedQueryClient()
  const rewards = useQueryLoadingDataWithError(
    address
      ? daoRewardsDistributorExtraQueries.pendingDaoRewards({
          chainId: dao.chainId,
          daoAddress: dao.coreAddress,
          recipient: address,
        })
      : undefined
  )

  const [claiming, setClaiming] = useState(false)
  const onClaim = async () => {
    if (!isWalletConnected || !address) {
      toast.error(t('error.logInToContinue'))
      return
    }

    if (rewards.loading || rewards.errored) {
      toast.error(t('error.loadingData'))
      return
    }

    const claimableDistributions = rewards.data.distributions.filter(
      ({ rewards }) => rewards.isPositive()
    )

    if (
      claimableDistributions.length === 0 ||
      claimableDistributions.every(({ rewards }) => rewards.isZero())
    ) {
      toast.error(t('error.noRewardsToClaim'))
      return
    }

    setClaiming(true)
    try {
      await executeSmartContracts({
        client: getSigningClient,
        sender: address,
        instructions: claimableDistributions.map(
          ({ distribution: { address, id } }) => ({
            contractAddress: address,
            msg: {
              claim: {
                id,
              },
            },
          })
        ),
      })

      toast.success(t('success.claimedRewards'))

      // Refresh.
      await queryClient.refetch(
        daoRewardsDistributorExtraQueries.pendingDaoRewards({
          chainId: dao.chainId,
          daoAddress: dao.coreAddress,
          recipient: address,
        })
      )
    } catch (error) {
      console.error(error)
      toast.error(processError(error))
    } finally {
      setClaiming(false)
    }
  }

  return (
    <StatelessDaoRewardsDistributorClaimCard
      {...props}
      claiming={claiming}
      onClaim={onClaim}
      rewards={
        rewards.loading || rewards.errored
          ? rewards
          : {
              loading: false,
              errored: false,
              updating: rewards.updating,
              data: rewards.data.rewards,
            }
      }
    />
  )
}
