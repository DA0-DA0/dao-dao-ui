import { Action } from '../types'
import { addTokenAction } from './AddToken'
import { customAction } from './Custom'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { manageMembersAction } from './ManageMembers'
import { migrateAction } from './MigrateContract'
import { mintAction } from './Mint'
import { removeTokenAction } from './RemoveToken'
import { spendAction } from './Spend'
import { stakeAction } from './Stake'
import { updateAdminAction } from './UpdateAdmin'
import { updateInfoAction } from './UpdateInfo'

export const actions: Action[] = [
  spendAction,
  mintAction,
  stakeAction,
  updateInfoAction,
  addTokenAction,
  removeTokenAction,
  manageMembersAction,
  instantiateAction,
  executeAction,
  migrateAction,
  updateAdminAction,
  customAction,
]
