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

export const daoActions: Action[] = [
  spendAction,
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
  // spendAction, // Need to figure out how to make balance queries work for wallet.
  stakeAction,
  instantiateAction,
  executeAction,
  migrateAction,
  customAction,
]
