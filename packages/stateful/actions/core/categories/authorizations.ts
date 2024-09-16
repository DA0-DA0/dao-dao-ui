import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'

export const makeAuthorizationsActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.Authorizations,
  label: t('actionCategory.authorizationsLabel'),
  description: t('actionCategory.authorizationsDescription'),
  actionKeys: [ActionKey.AuthzGrantRevoke, ActionKey.AuthzExec],
})
