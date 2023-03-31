import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeAuthzAuthorizationAction } from './AuthzAuthorization'
import { makeAuthzExecAction } from './AuthzExec'

export const makeAuthorizationsActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.Authorizations,
  label: t('actionCategory.authorizationsLabel'),
  description: t('actionCategory.authorizationsDescription'),
  actionMakers: [makeAuthzAuthorizationAction, makeAuthzExecAction],
})
