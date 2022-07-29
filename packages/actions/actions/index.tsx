import { Action } from '../types'
import { addCw20Action } from './AddCw20'
import { addCw721Action } from './AddCw721'
import { customAction } from './Custom'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { migrateAction } from './MigrateContract'
import { removeCw20Action } from './RemoveCw20'
import { removeCw721Action } from './RemoveCw721'
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
  addCw721Action,
  removeCw721Action,
  instantiateAction,
  executeAction,
  migrateAction,
  updateAdminAction,
  customAction,
]
