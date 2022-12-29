import { Action, ActionOptions } from '@dao-dao/types/actions'
import { DISABLED_ACTIONS } from '@dao-dao/utils'

import { makeCustomAction } from './Custom'
import { makeExecuteAction } from './Execute'
import { makeInstantiateAction } from './Instantiate'
import { makeManageCw20Action } from './ManageCw20'
import { makeManageCw721Action } from './ManageCw721'
import { makeManageSubDaosAction } from './ManageSubDaos'
import { makeMigrateAction } from './MigrateContract'
import {
  makeBurnNftAction,
  makeMintNftAction,
  makeTransferNftAction,
} from './nft'
import { makeRemoveItemAction } from './RemoveItem'
import { makeSetItemAction } from './SetItem'
import { makeSpendAction } from './Spend'
import { makeStakeAction } from './StakingActions'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'
import { makeUpdateAdminAction } from './UpdateAdmin'
import { makeUpdateInfoAction } from './UpdateInfo'

export const getActions = (options: ActionOptions): Action[] => {
  // Add action makers here to display them.
  const actionMakers = [
    makeSpendAction,
    makeStakeAction,
    makeUpdateInfoAction,
    makeManageCw20Action,
    makeManageCw721Action,
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
