// External API

import { useCallback } from 'react'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  Action,
  ActionOptions,
  PayrollAdapterWithActions,
} from '@dao-dao/types'

import { getAdapterById } from '../core'

// Get payroll adapter for the DAO based on its configured payroll system. If
// nothing configured or no system found, returns undefined.
export const usePayrollAdapter = (): PayrollAdapterWithActions | undefined => {
  const { chainId, coreAddress } = useDaoInfoContext()

  const payrollConfig = useCachedLoadable(
    DaoCoreV2Selectors.payrollConfigSelector({
      coreAddress,
      chainId,
    })
  )

  // If config not yet loaded, return undefined.
  const adapter =
    payrollConfig.state === 'hasValue' && payrollConfig.contents
      ? getAdapterById(payrollConfig.contents.type)
      : undefined

  // Create hook to generate actions for the adapter.
  const makeActions = useCallback(
    (options: ActionOptions) =>
      (adapter?.actionMakers
        ?.map((makeAction) => makeAction(options))
        .filter(Boolean) ?? []) as Action[],
    [adapter]
  )

  return (
    adapter && {
      ...adapter,
      makeActions,
    }
  )
}
