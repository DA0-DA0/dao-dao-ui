import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  daoVoteDelegationQueries,
  delegationsQueries,
} from '@dao-dao/state/query'
import {
  DaoVoteDelegationCard as StatelessDaoVoteDelegationCard,
  useDao,
  useDependencyTrackedQueryClient,
} from '@dao-dao/stateless'
import {
  DelegationForm,
  ModuleId,
  StatefulDaoVoteDelegationCardProps,
  VoteDelegationModuleData,
} from '@dao-dao/types'
import {
  executeSmartContract,
  executeSmartContracts,
  processError,
  waitUntilBlockHeight,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useOnWebSocketMessage,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../hooks'
import { getDaoModule } from '../../modules'
import { Trans } from '../Trans'

export const DaoVoteDelegationCard = (
  props: StatefulDaoVoteDelegationCardProps
) => {
  const { t } = useTranslation()
  const dao = useDao()
  const queryClient = useDependencyTrackedQueryClient()
  const { address: walletAddress, getSigningClient } = useWallet()

  const voteDelegation = useMemo(
    () =>
      getDaoModule<VoteDelegationModuleData>(dao, ModuleId.VoteDelegation)
        ?.daoModule,
    [dao]
  )
  if (!voteDelegation?.values?.address) {
    throw new Error('Vote delegation module not set up')
  }

  const chainId = dao.chainId
  const delegationModule = voteDelegation.values.address

  const totalVotingPower = useQueryLoadingDataWithError(
    dao.getTotalVotingPowerQuery(),
    (data) => HugeDecimal.from(data.power)
  )

  const walletVotingPower = useQueryLoadingDataWithError(
    dao.getVotingPowerQuery(walletAddress),
    (data) => HugeDecimal.from(data.power)
  )

  const delegates = useQueryLoadingDataWithError(
    delegationsQueries.listAllDelegates({
      chainId,
      address: delegationModule,
    })
  )

  const delegations = useQueryLoadingDataWithError(
    walletAddress
      ? delegationsQueries.listAllDelegations({
          chainId,
          address: delegationModule,
          delegator: walletAddress,
        })
      : undefined
  )

  const registration = useQueryLoadingDataWithError(
    walletAddress
      ? daoVoteDelegationQueries.registration({
          chainId,
          contractAddress: delegationModule,
          args: {
            delegate: walletAddress,
          },
        })
      : undefined
  )

  const awaitNextBlock = useAwaitNextBlock()

  // Listen for delegated VP changes and refresh the registration query.
  useOnWebSocketMessage<{
    height: string
  }>(
    walletAddress &&
      !registration.loading &&
      !registration.errored &&
      registration.data.registered
      ? [`delegate_${chainId}_${delegationModule}_${walletAddress}`]
      : [],
    'delegated_vp_change',
    async ({ height }) => {
      if (!walletAddress) {
        return
      }

      try {
        // Wait until the block height reaches the height of the change plus
        // one extra block for good measure.
        await waitUntilBlockHeight({
          chainId,
          blockHeight: parseInt(height) + 1,
        })

        await queryClient.refetch(
          daoVoteDelegationQueries.registration({
            chainId,
            contractAddress: delegationModule,
            args: { delegate: walletAddress },
          })
        )
      } catch (error) {
        console.error(
          'Error updating registration after delegated VP change',
          error
        )
      }
    }
  )

  const [loadingRegistration, setLoadingRegistration] = useState(false)
  const updateRegistration = async (register: boolean) => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return false
    }

    setLoadingRegistration(true)
    try {
      // Ensure there are no delegations when registering.
      const delegations = register
        ? await queryClient.fetchQuery(
            delegationsQueries.listAllDelegations({
              chainId,
              address: delegationModule,
              delegator: walletAddress,
            })
          )
        : []

      await executeSmartContracts({
        client: getSigningClient,
        sender: walletAddress,
        instructions: [
          // Undelegate all existing delegations when registering.
          ...delegations.map(({ delegate }) => ({
            contractAddress: delegationModule,
            msg: {
              undelegate: {
                delegate,
              },
            },
          })),
          // Register or unregister.
          {
            contractAddress: delegationModule,
            msg: register
              ? {
                  register: {},
                }
              : {
                  unregister: {},
                },
          },
        ],
      })

      // Wait one block.
      await awaitNextBlock()

      await Promise.all([
        queryClient.refetch(
          daoVoteDelegationQueries.registration({
            chainId,
            contractAddress: delegationModule,
            args: {
              delegate: walletAddress,
            },
          })
        ),
        queryClient.refetch(
          delegationsQueries.listAllDelegates({
            chainId,
            address: delegationModule,
          })
        ),
        queryClient.refetch(
          delegationsQueries.listAllDelegations({
            chainId,
            address: delegationModule,
            delegator: walletAddress,
          })
        ),
      ])

      if (register) {
        toast.success(t('success.registered'))
      } else {
        toast.success(t('success.unregistered'))
      }

      return true
    } catch (error) {
      console.error(error)
      toast.error(processError(error))
      return false
    } finally {
      setLoadingRegistration(false)
    }
  }

  const [loadingDelegate, setLoadingDelegate] = useState(false)
  const delegate = async ({ delegate, percent }: DelegationForm) => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return false
    }

    setLoadingDelegate(true)
    try {
      await executeSmartContract(
        getSigningClient,
        walletAddress,
        delegationModule,
        {
          delegate: {
            delegate,
            percent: HugeDecimal.from(percent).div(100).toString(),
          },
        }
      )

      // Wait one block.
      await awaitNextBlock()

      await queryClient.refetch(
        delegationsQueries.listAllDelegations({
          chainId,
          address: delegationModule,
          delegator: walletAddress,
        })
      )

      toast.success(t('success.delegated'))
      return true
    } catch (error) {
      console.error(error)
      toast.error(processError(error))
      return false
    } finally {
      setLoadingDelegate(false)
    }
  }

  const [loadingUndelegate, setLoadingUndelegate] = useState(false)
  const undelegate = async (delegate: string) => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return false
    }

    setLoadingUndelegate(true)
    try {
      await executeSmartContract(
        getSigningClient,
        walletAddress,
        delegationModule,
        {
          undelegate: {
            delegate,
          },
        }
      )

      // Wait one block.
      await awaitNextBlock()

      await queryClient.refetch(
        delegationsQueries.listAllDelegations({
          chainId,
          address: delegationModule,
          delegator: walletAddress,
        })
      )

      toast.success(t('success.undelegated'))
      return true
    } catch (error) {
      console.error(error)
      toast.error(processError(error))
      return false
    } finally {
      setLoadingUndelegate(false)
    }
  }

  return (
    <StatelessDaoVoteDelegationCard
      {...props}
      Trans={Trans}
      delegate={delegate}
      delegates={delegates}
      delegations={delegations}
      loadingDelegate={loadingDelegate}
      loadingRegistration={loadingRegistration}
      loadingUndelegate={loadingUndelegate}
      registration={registration}
      totalVotingPower={totalVotingPower}
      undelegate={undelegate}
      updateRegistration={updateRegistration}
      walletVotingPower={walletVotingPower}
    />
  )
}
