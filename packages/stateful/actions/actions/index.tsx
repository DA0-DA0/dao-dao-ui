import { Action, ActionOptions } from '@dao-dao/types/actions'
import { DISABLED_ACTIONS } from '@dao-dao/utils'

import { makeAddCw20Action } from './AddCw20'
import { makeAddCw721Action } from './AddCw721'
import { makeAuthzAuthorizationAction } from './AuthzAuthorization'
import { makeAuthzExecAction } from './AuthzExec'
import { makeCreateValidatorAction } from './CreateValidator'
import { makeCustomAction } from './Custom'
import { makeEditValidatorAction } from './EditValidator'
import { makeExecuteAction } from './Execute'
import { makeInstantiateAction } from './Instantiate'
import { makeManageSubDaosAction } from './ManageSubDaos'
import { makeMigrateAction } from './MigrateContract'
import {
  makeBurnNftAction,
  makeMintNftAction,
  makeTransferNftAction,
} from './nft'
import { makeRemoveCw20Action } from './RemoveCw20'
import { makeRemoveCw721Action } from './RemoveCw721'
import { makeRemoveItemAction } from './RemoveItem'
import { makeSetItemAction } from './SetItem'
import { makeSpendAction } from './Spend'
import { makeStakeAction } from './StakingActions'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'
import { makeUnjailValidatorAction } from './UnjailValidator'
import { makeUpdateAdminAction } from './UpdateAdmin'
import { makeUpdateInfoAction } from './UpdateInfo'

export const getActions = (options: ActionOptions): Action[] => {
  // Add action makers here to display them.
  const actionMakers = [
    makeSpendAction,
    makeStakeAction,
    makeUpdateInfoAction,
    makeAddCw20Action,
    makeRemoveCw20Action,
    makeAddCw721Action,
    makeRemoveCw721Action,
    makeMintNftAction,
    makeTransferNftAction,
    makeBurnNftAction,
    makeInstantiateAction,
    makeExecuteAction,
    makeMigrateAction,
    makeUpdateAdminAction,
    makeCustomAction,
    makeManageSubDaosAction,
    makePerformTokenSwapAction,
    makeWithdrawTokenSwapAction,
    makeSetItemAction,
    makeRemoveItemAction,
    makeAuthzAuthorizationAction,
    makeAuthzExecAction,
    makeCreateValidatorAction,
    makeEditValidatorAction,
    makeUnjailValidatorAction,
  ]

  return actionMakers
    .map((makeAction) => makeAction(options))
    .filter(
      (action): action is Action =>
        // Remove null values, since maker functions return null if they don't
        // make sense in the context (like a DAO-only action in a wallet
        // context).
        action !== null &&
        // Remove disabled actions.
        !DISABLED_ACTIONS.includes(action.key)
    )
}
