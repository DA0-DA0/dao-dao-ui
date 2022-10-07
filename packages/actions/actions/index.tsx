import { ContractVersion } from '@dao-dao/tstypes'
import { Action } from '@dao-dao/tstypes/actions'

import { addCw20Action } from './AddCw20'
import { addCw721Action } from './AddCw721'
import { authzAuthorizationAction } from './AuthzAuthorization'
import { authzExecAction } from './AuthzExec'
import { createValidatorAction } from './CreateValidator'
import { customAction } from './Custom'
import { editValidatorAction } from './EditValidator'
import { executeAction } from './Execute'
import { instantiateAction } from './Instantiate'
import { manageSubDaosAction } from './ManageSubDaos'
import { migrateAction } from './MigrateContract'
import { removeCw20Action } from './RemoveCw20'
import { removeCw721Action } from './RemoveCw721'
import { makeSpendAction } from './Spend'
import { stakeAction } from './Stake'
import { updateAdminAction } from './UpdateAdmin'
import { updateInfoAction } from './UpdateInfo'

export const getDaoActions = (coreVersion: ContractVersion): Action[] =>
  [
    // TODO: Convert this into a more generalizable 'context' abstraction.
    makeSpendAction(false),
    stakeAction,
    updateInfoAction,
    addCw20Action,
    removeCw20Action,
    addCw721Action,
    removeCw721Action,
    instantiateAction,
    executeAction,
    migrateAction,
    updateAdminAction,
    customAction,
    manageSubDaosAction,
    authzAuthorizationAction,
    authzExecAction,
    createValidatorAction,
    editValidatorAction,
  ].filter(
    ({ supportedCoreVersions }) =>
      !supportedCoreVersions || supportedCoreVersions.includes(coreVersion)
  )

export const walletActions: Action[] = [
  // TODO: Convert this into a more generalizable 'context' abstraction.
  makeSpendAction(true),
  stakeAction,
  authzAuthorizationAction,
  authzExecAction,
  instantiateAction,
  executeAction,
  migrateAction,
  customAction,
]
