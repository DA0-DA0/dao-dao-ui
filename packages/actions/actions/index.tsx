import { Action } from '../types'
import { addCw20Action } from './AddCw20'
import { customAction } from './Custom'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { migrateAction } from './MigrateContract'
import { removeCw20Action } from './RemoveCw20'
import { spendAction } from './Spend'
import { stakeAction } from './Stake'
import { updateAdminAction } from './UpdateAdmin'
import { updateInfoAction } from './UpdateInfo'

export const commonActions: Action[] = [
  spendAction,
  stakeAction,
  updateInfoAction,
  addCw20Action,
  removeCw20Action,
  instantiateAction,
  executeAction,
  migrateAction,
  updateAdminAction,
  customAction,
]
