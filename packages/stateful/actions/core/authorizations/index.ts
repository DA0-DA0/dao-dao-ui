import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeAuthorizeVoterAction } from './AuthorizeVoter'
import { makeAuthzExecAction } from './AuthzExec'
import { makeAuthzGrantRevokeAction } from './AuthzGrantRevoke'
import { makeDeauthorizeVoterAction } from './DeauthorizeVoter'

export const makeAuthorizationsActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.Authorizations,
  label: t('actionCategory.authorizationsLabel'),
  description: t('actionCategory.authorizationsDescription'),
  actionMakers: [
    makeAuthzGrantRevokeAction,
    makeAuthzExecAction,
    makeAuthorizeVoterAction,
    makeDeauthorizeVoterAction,
  ],
})
