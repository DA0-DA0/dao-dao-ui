// External API

import { useMemo } from 'react'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import { Action, PayrollAdapterWithActions } from '@dao-dao/types'

import { useActionOptions } from '../../actions'
import { getAdapterById } from '../core'

// Get payroll adapter for the DAO based on its configured payroll system. If
// nothing configured or no system found, returns undefined.
export const usePayrollAdapter = (): PayrollAdapterWithActions | undefined => {
  const { chainId, coreAddress } = useDaoInfoContext()
  const actionOptions = useActionOptions()

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
  const actions = useMemo(
    () =>
      adapter?.actionMakers
        ?.map((makeAction) => makeAction(actionOptions))
        .filter(Boolean) as Action[],
    [adapter, actionOptions]
  )

  return (
    adapter && {
      ...adapter,
      actions,
    }
  )
}
