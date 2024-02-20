import { useEffect } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import { refreshVestingAtom } from '@dao-dao/state/recoil'
import {
  useCachedLoadingWithError,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionKey,
  VestingPaymentsWidgetData,
  WidgetRendererProps,
} from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../../../actions'
import {
  ButtonLink,
  EntityDisplay,
  Trans,
  VestingPaymentCard,
} from '../../../../../components'
import { useMembership } from '../../../../../hooks/useMembership'
import { vestingInfosForFactorySelector } from '../../../../../recoil'
import { TabRenderer as StatelessTabRenderer } from './TabRenderer'

export const TabRenderer = ({
  variables: { factories, factory, oldFactories },
}: WidgetRendererProps<VestingPaymentsWidgetData>) => {
  const { chain_id: defaultChainId } = useChain()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const setRefresh = useSetRecoilState(refreshVestingAtom(''))
  // Refresh vesting data every 30 seconds.
  useEffect(() => {
    const interval = setInterval(() => setRefresh((id) => id + 1), 30000)
    return () => clearInterval(interval)
  }, [setRefresh])

  const vestingPaymentsLoading = useCachedLoadingWithError(
    waitForAll([
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
        vestingInfosForFactorySelector({
          chainId,
          factory: address,
        })
      ),

      // Old factories.
      ...(oldFactories || []).map(({ address }) =>
        vestingInfosForFactorySelector({
          chainId: defaultChainId,
          factory: address,
        })
      ),
    ]),
    // Combine all vesting infos into one list across chains.
    (data) => data.flat()
  )

  const vestingAction = useActionForKey(ActionKey.ManageVesting)
  const vestingActionDefaults = vestingAction?.useDefaults()

  // Vesting payments that need a slash registered.
  const vestingPaymentsNeedingSlashRegistration =
    vestingPaymentsLoading.loading || vestingPaymentsLoading.errored
      ? []
      : vestingPaymentsLoading.data.filter(
          ({ hasUnregisteredSlashes }) => hasUnregisteredSlashes
        )

  return (
    <StatelessTabRenderer
      ButtonLink={ButtonLink}
      EntityDisplay={EntityDisplay}
      Trans={Trans}
      VestingPaymentCard={VestingPaymentCard}
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
                                time: (slash.timeMs * 1e6).toString(),
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
      vestingPaymentsLoading={vestingPaymentsLoading}
    />
  )
}
