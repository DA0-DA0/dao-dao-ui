// External API

import { useRecoilValueLoadable } from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state/recoil'
import { useDaoInfoContext } from '@dao-dao/stateless'
import { PayrollAdapter } from '@dao-dao/types'

import { DAO_PAYROLL_ITEM_KEY, getAdapterById } from '../core'

// Get payroll adapter for the DAO based on its configured payroll system. If
// nothing configured or no system found, returns undefined.
export const usePayrollAdapter = (): PayrollAdapter | undefined => {
  const { chainId, coreAddress } = useDaoInfoContext()

  const payrollItem = useRecoilValueLoadable(
    CwdCoreV2Selectors.getItemSelector({
      chainId,
      contractAddress: coreAddress,
      params: [
        {
          key: DAO_PAYROLL_ITEM_KEY,
        },
      ],
    })
  )

  return payrollItem.state === 'hasValue' && payrollItem.contents.item
    ? getAdapterById(payrollItem.contents.item)
    : undefined
}
