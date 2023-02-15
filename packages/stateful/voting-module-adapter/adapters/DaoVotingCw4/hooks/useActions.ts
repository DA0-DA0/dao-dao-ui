import { Action, ActionOptions } from '@dao-dao/types'

import { makeManageMembersAction } from '../actions'

export const useActions = (options: ActionOptions) =>
  [makeManageMembersAction(options)].filter(Boolean) as Action[]
