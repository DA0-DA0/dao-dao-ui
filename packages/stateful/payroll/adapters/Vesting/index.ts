import { PayrollAdapter } from '@dao-dao/types'

import { makeManageVestingAction } from './action/makeManageVestingAction'
import { PayrollTab } from './components'

export const VestingAdapter: PayrollAdapter = {
  id: 'vesting',
  PayrollTab,
  actionMakers: [makeManageVestingAction],
}
