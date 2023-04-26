import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshVestingAtom } from '@dao-dao/state/recoil'
import {
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useActionForKey } from '../../../../../actions'
import { ButtonLink, EntityDisplay, Trans } from '../../../../../components'
import { useDaoProposalSinglePrefill } from '../../../../../hooks/useDaoProposalSinglePrefill'
import { useMembership } from '../../../../../hooks/useMembership'
import { VestingPaymentCard } from '../../components/VestingPaymentCard'
import { VestingPaymentsData } from '../../types'
import { vestingInfosSelector } from '../state'
import { TabRenderer as StatelessTabRenderer } from './TabRenderer'

export const TabRenderer = ({
  variables: { factory },
}: WidgetRendererProps<VestingPaymentsData>) => {
  const { chain_id: chainId } = useChain()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const setRefresh = useSetRecoilState(refreshVestingAtom(''))
  // Refresh vesting data every 30 seconds.
  useEffect(() => {
    const interval = setInterval(() => setRefresh((id) => id + 1), 30000)
    return () => clearInterval(interval)
  }, [setRefresh])

  const vestingPaymentsLoading = loadableToLoadingData(
    useCachedLoadable(
      vestingInfosSelector({
        factory,
        chainId,
      })
    ),
    []
  )

  const vestingAction = useActionForKey(ActionKey.ManageVesting)
  const vestingActionDefaults = vestingAction?.action.useDefaults()

  const createVestingPaymentPrefill = useDaoProposalSinglePrefill({
    actions: vestingAction
      ? [
          {
            actionKey: vestingAction.action.key,
            data: vestingActionDefaults,
          },
        ]
      : [],
  })

  // Vesting payments that need a slash registered.
  const vestingPaymentsNeedingSlashRegistration = vestingPaymentsLoading.loading
    ? []
    : vestingPaymentsLoading.data.filter(
        ({ hasUnregisteredSlashes }) => hasUnregisteredSlashes
      )
  const registerSlashesPrefill = useDaoProposalSinglePrefill({
    actions: vestingAction
      ? vestingPaymentsNeedingSlashRegistration.flatMap(
          ({ vestingContractAddress, slashes: validatorsWithSlashes }) =>
            validatorsWithSlashes.flatMap(
              ({ validatorOperatorAddress, slashes }) =>
                slashes
                  .filter((slash) => slash.unregisteredAmount > 0)
                  .map((slash) => ({
                    action: vestingAction,
                    data: {
                      ...vestingActionDefaults,
                      mode: 'registerSlash',
                      registerSlash: {
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
        )
      : [],
  })

  return (
    <StatelessTabRenderer
      ButtonLink={ButtonLink}
      EntityDisplay={EntityDisplay}
      Trans={Trans}
      VestingPaymentCard={VestingPaymentCard}
      createVestingPaymentHref={
        vestingAction && createVestingPaymentPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: createVestingPaymentPrefill,
            })
          : undefined
      }
      isMember={isMember}
      registerSlashesHref={
        vestingAction && registerSlashesPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: registerSlashesPrefill,
            })
          : undefined
      }
      vestingPaymentsLoading={vestingPaymentsLoading}
    />
  )
}
