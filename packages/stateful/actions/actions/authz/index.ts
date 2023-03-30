import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeAuthzAuthorizationAction } from './AuthzAuthorization'
import { makeAuthzExecAction } from './AuthzExec'

export const makeAuthzActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Authz,
  label: t('title.authz'),
  description: t('info.authzDescription'),
  actionMakers: [makeAuthzAuthorizationAction, makeAuthzExecAction],
})
