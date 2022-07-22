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
import { updateProposalConfigAction } from './UpdateProposalConfig'

export const actions: Action[] = [
  spendAction,
  mintAction,
  stakeAction,
  updateInfoAction,
  addTokenAction,
  removeTokenAction,
  // Must be above execute since this is a custom execute message.
  manageMembersAction,
  updateProposalConfigAction,
  instantiateAction,
  executeAction,
  migrateAction,
  updateAdminAction,
  // Ensure custom is always last for two reasons:
  // 1. It should display last since it is a catch-all.
  // 2. It should be the last action type matched against when listing
  //    proposals in the UI since it will match any message.
  customAction,
]
