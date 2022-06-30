import { Action } from '../types'
import { addTokenAction } from './AddToken'
import { customAction } from './Custom'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { migrateAction } from './MigrateContract'
import { mintAction } from './Mint'
import { removeTokenAction } from './RemoveToken'
import { spendAction } from './Spend'
import { stakeAction } from './Stake'
import { updateInfoAction } from './UpdateInfo'
import { updateProposalConfigAction } from './UpdateProposalConfig'

export const actions: Action[] = [
  spendAction,
  mintAction,
  stakeAction,
  updateInfoAction,
  addTokenAction,
  removeTokenAction,
  updateProposalConfigAction,
  instantiateAction,
  executeAction,
  migrateAction,
  // Ensure custom is always last for two reasons:
  // 1. It should display last since it is a catch-all.
  // 2. It should be the last action type matched against when listing
  //    proposals in the UI since it will match any message.
  customAction,
]
