import { Action, ActionOptions } from '@dao-dao/types/actions'

import { makeAddCw20Action } from './AddCw20'
import { makeAddCw721Action } from './AddCw721'
import { makeCustomAction } from './Custom'
import { makeExecuteAction } from './Execute'
import { makeInstantiateAction } from './Instantiate'
import { makeManageSubDaosAction } from './ManageSubDaos'
import { makeMigrateAction } from './MigrateContract'
import { makeMintNftAction, makeTransferNftAction } from './nft'
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

  return (
    actionMakers
      .map((makeAction) => makeAction(options))
      // Remove null values, since maker functions return null if they don't
      // make sense in the context (like a DAO-only action in a wallet context).
      .filter(Boolean) as Action[]
  )
}
