import { Action } from '../types'
import { addTokenAction } from './AddToken'
import { customAction } from './Custom'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { migrateAction } from './MigrateContract'
import { removeTokenAction } from './RemoveToken'
import { spendAction } from './Spend'
import { stakeAction } from './Stake'
import { updateAdminAction } from './UpdateAdmin'
import { updateInfoAction } from './UpdateInfo'

export const commonActions: Action[] = [
  spendAction,
  stakeAction,
  updateInfoAction,
  addTokenAction,
  removeTokenAction,
  instantiateAction,
  executeAction,
  migrateAction,
  updateAdminAction,
  customAction,
]
