import { Action } from '../types'
import { addCw20Action } from './AddCw20'
import { authzAuthorizationAction } from './AuthzAuthorization'
import { authzExecAction } from './AuthzExec'
import { createValidatorAction } from './CreateValidator'
import { customAction } from './Custom'
import { editValidatorAction } from './EditValidator'
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
  authzAuthorizationAction,
  authzExecAction,
  addCw20Action,
  createValidatorAction,
  editValidatorAction,
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
