import { Action } from '@dao-dao/tstypes/actions'
import { addCw20Action } from './AddCw20'
import { customAction } from './Custom'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { migrateAction } from './MigrateContract'
import { removeCw20Action } from './RemoveCw20'
import { makeSpendAction } from './Spend'
import { stakeAction } from './Stake'
import { updateAdminAction } from './UpdateAdmin'
import { updateInfoAction } from './UpdateInfo'

export const daoActions: Action[] = [
  // TODO: Convert this into a more generalizable 'context' abstraction.
  makeSpendAction(false),
  stakeAction,
  updateInfoAction,
  addCw20Action,
  removeCw20Action,
  // TODO: Add back in once CW721s are displayed.
  // addCw721Action,
  // removeCw721Action,
  instantiateAction,
  executeAction,
  migrateAction,
  updateAdminAction,
  customAction,
]

export const walletActions: Action[] = [
  // TODO: Convert this into a more generalizable 'context' abstraction.
  makeSpendAction(true),
  stakeAction,
  instantiateAction,
  executeAction,
  migrateAction,
  customAction,
]
