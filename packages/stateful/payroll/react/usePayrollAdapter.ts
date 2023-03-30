// External API

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  ActionCategoryMaker,
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

  const actionCategoryMakers: ActionCategoryMaker[] = adapter?.actionMakers
    ?.length
    ? [
        () => ({
          // Add payroll adapter actions to the Treasury category.
          key: ActionCategoryKey.Treasury,
          actionMakers: adapter.actionMakers,
        }),
      ]
    : []

  return (
    adapter && {
      ...adapter,
      actionCategoryMakers,
    }
  )
}
