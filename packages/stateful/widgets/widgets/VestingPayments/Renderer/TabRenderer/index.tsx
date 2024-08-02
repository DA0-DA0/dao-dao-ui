import { useQueries, useQueryClient } from '@tanstack/react-query'

import {
  cwPayrollFactoryExtraQueries,
  cwVestingExtraQueries,
} from '@dao-dao/state/query'
import { useDaoInfoContext, useDaoNavHelpers } from '@dao-dao/stateless'
import {
  ActionKey,
  VestingPaymentsWidgetData,
  WidgetRendererProps,
} from '@dao-dao/types'
import {
  getDaoProposalSinglePrefill,
  makeCombineQueryResultsIntoLoadingDataWithError,
} from '@dao-dao/utils'

import { useActionForKey } from '../../../../../actions'
import {
  ButtonLink,
  Trans,
  VestingPaymentCard,
  VestingPaymentLine,
} from '../../../../../components'
import { useMembership } from '../../../../../hooks/useMembership'
import { TabRenderer as StatelessTabRenderer } from './TabRenderer'

export const TabRenderer = ({
  variables: { factories, factory, oldFactories },
}: WidgetRendererProps<VestingPaymentsWidgetData>) => {
  const { chainId: defaultChainId, coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership()

  const queryClient = useQueryClient()
  const vestingContractsLoading = useQueries({
    queries: [
      // Factory or factory list depending on version.
      ...(factories
        ? Object.entries(factories).map(([chainId, { address }]) => ({
            chainId,
            address,
          }))
        : factory
        ? [
            {
              chainId: defaultChainId,
              address: factory,
            },
          ]
        : // Should never happen.
          []
      ).map(({ chainId, address }) =>
        cwPayrollFactoryExtraQueries.listAllVestingContracts(queryClient, {
          chainId,
          address,
        })
      ),

      // Old factories.
      ...(oldFactories || []).map(({ address }) =>
        cwPayrollFactoryExtraQueries.listAllVestingContracts(queryClient, {
          chainId: defaultChainId,
          address,
        })
      ),
    ],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
    }),
  })
  // Fetch infos individually so they refresh when data is updated elsewhere.
  const vestingInfosLoading = useQueries({
    queries:
      vestingContractsLoading.loading || vestingContractsLoading.errored
        ? []
        : vestingContractsLoading.data.flatMap(({ chainId, contracts }) =>
            contracts.map(({ contract }) =>
              cwVestingExtraQueries.info(queryClient, {
                chainId,
                address: contract,
              })
            )
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
    }),
  })

  const vestingAction = useActionForKey(ActionKey.ManageVesting)
  const vestingActionDefaults = vestingAction?.useDefaults()

  // Vesting payments that need a slash registered.
  const vestingPaymentsNeedingSlashRegistration =
    vestingInfosLoading.loading || vestingInfosLoading.errored
      ? []
      : vestingInfosLoading.data.filter(
          ({ hasUnregisteredSlashes }) => hasUnregisteredSlashes
        )

  return (
    <StatelessTabRenderer
      ButtonLink={ButtonLink}
      Trans={Trans}
      VestingPaymentCard={VestingPaymentCard}
      VestingPaymentLine={VestingPaymentLine}
      createVestingPaymentHref={
        vestingAction
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: [
                  {
                    actionKey: vestingAction.key,
                    data: vestingActionDefaults,
                  },
                ],
              }),
            })
          : undefined
      }
      isMember={isMember}
      registerSlashesHref={
        vestingAction && vestingPaymentsNeedingSlashRegistration.length > 0
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: vestingPaymentsNeedingSlashRegistration.flatMap(
                  ({
                    chainId,
                    vestingContractAddress,
                    slashes: validatorsWithSlashes,
                  }) =>
                    validatorsWithSlashes.flatMap(
                      ({ validatorOperatorAddress, slashes }) =>
                        slashes
                          .filter((slash) => slash.unregisteredAmount > 0)
                          .map((slash) => ({
                            actionKey: vestingAction.key,
                            data: {
                              ...vestingActionDefaults,
                              mode: 'registerSlash',
                              registerSlash: {
                                chainId,
                                address: vestingContractAddress,
                                validator: validatorOperatorAddress,
                                // Milliseconds to nanoseconds.
                                time: BigInt(slash.timeMs * 1e6).toString(),
                                amount: slash.unregisteredAmount.toString(),
                                duringUnbonding: slash.duringUnbonding,
                              },
                            },
                          }))
                    )
                ),
              }),
            })
          : undefined
      }
      vestingPaymentsLoading={vestingInfosLoading}
    />
  )
}
