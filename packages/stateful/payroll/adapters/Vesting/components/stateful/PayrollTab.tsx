import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshVestingAtom } from '@dao-dao/state/recoil'
import {
  useCachedLoadable,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { CoreActionKey } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useActionForKey } from '../../../../../actions'
import { ButtonLink, EntityDisplay } from '../../../../../components'
import { useDaoProposalSinglePrefill } from '../../../../../hooks/useDaoProposalSinglePrefill'
import { useMembership } from '../../../../../hooks/useMembership'
import { vestingInfosSelector } from '../../state'
import { PayrollTab as StatelessPayrollTab } from '../stateless/PayrollTab'
import { VestingPaymentCard } from './VestingPaymentCard'

export const PayrollTab = () => {
  const { coreAddress, chainId } = useDaoInfoContext()
  const { getDaoProposalPath } = useNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
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
        coreAddress,
        chainId,
      })
    ),
    []
  )

  const vestingAction = useActionForKey(CoreActionKey.ManageVesting)
  const vestingActionDefaults = vestingAction?.useDefaults()

  const createVestingPaymentPrefill = useDaoProposalSinglePrefill({
    actions: vestingAction
      ? [
          {
            action: vestingAction,
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
      ? vestingPaymentsNeedingSlashRegistration.map(
          ({ vestingContractAddress }) => ({
            action: vestingAction,
            data: {
              ...vestingActionDefaults,
              mode: 'registerSlash',
              registerSlash: {
                address: vestingContractAddress,
              },
            },
          })
        )
      : [],
  })

  return (
    <StatelessPayrollTab
      ButtonLink={ButtonLink}
      EntityDisplay={EntityDisplay}
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
