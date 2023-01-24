// External API

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import { PayrollAdapter } from '@dao-dao/types'

import { getAdapterById } from '../core'

// Get payroll adapter for the DAO based on its configured payroll system. If
// nothing configured or no system found, returns undefined.
export const usePayrollAdapter = (): PayrollAdapter | undefined => {
  const { chainId, coreAddress } = useDaoInfoContext()

  const payrollConfig = useCachedLoadable(
    DaoCoreV2Selectors.payrollConfigSelector({
      coreAddress,
      chainId,
    })
  )

  // If config not yet loaded, return undefined.
  if (payrollConfig.state !== 'hasValue' || !payrollConfig.contents) {
    return
  }

  return getAdapterById(payrollConfig.contents.type)
}
