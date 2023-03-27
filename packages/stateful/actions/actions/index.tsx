import { Action, ActionOptions } from '@dao-dao/types/actions'
import { DISABLED_ACTIONS } from '@dao-dao/utils'

import { makeAuthzAuthorizationAction } from './AuthzAuthorization'
import { makeAuthzExecAction } from './AuthzExec'
import { makeCustomAction } from './Custom'
import { makeDaoAdminExecAction } from './DaoAdminExec'
import { makeExecuteAction } from './Execute'
import { makeGovernanceVoteAction } from './GovernanceVote'
import { makeInstantiateAction } from './Instantiate'
import { makeManageCw20Action } from './ManageCw20'
import { makeManageCw721Action } from './ManageCw721'
import { makeManageStorageItemsAction } from './ManageStorageItems'
import { makeManageSubDaosAction } from './ManageSubDaos'
import { makeManageWidgetsAction } from './ManageWidgets'
import { makeMigrateAction } from './MigrateContract'
import {
  makeBurnNftAction,
  makeMintNftAction,
  makeTransferNftAction,
} from './nft'
import { makeSpendAction } from './Spend'
import { makeStakeAction } from './StakingActions'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'
import { makeUpdateAdminAction } from './UpdateAdmin'
import { makeUpdateInfoAction } from './UpdateInfo'
import { makeValidatorActions } from './ValidatorActions'
import { makeWyndSwapAction } from './wynd/WyndSwap'

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
    makeManageStorageItemsAction,
    makeWithdrawTokenSwapAction,
    makeAuthzAuthorizationAction,
    makeAuthzExecAction,
    makeValidatorActions,
    makeGovernanceVoteAction,
    makeWyndSwapAction,
    makeDaoAdminExecAction,
    makeManageWidgetsAction,
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
