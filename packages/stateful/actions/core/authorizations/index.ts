import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeAuthzExecAction } from './AuthzExec'
import { makeAuthzGrantRevokeAction } from './AuthzGrantRevoke'

export const makeAuthorizationsActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.Authorizations,
  label: t('actionCategory.authorizationsLabel'),
  description: t('actionCategory.authorizationsDescription'),
  actionMakers: [makeAuthzGrantRevokeAction, makeAuthzExecAction],
})
