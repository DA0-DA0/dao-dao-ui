import { PayrollAdapter } from '@dao-dao/types'

import { PayrollTab } from './components'

export const RetroactiveAdapter: PayrollAdapter = {
  id: 'retroactive',
  PayrollTab: PayrollTab,
}
