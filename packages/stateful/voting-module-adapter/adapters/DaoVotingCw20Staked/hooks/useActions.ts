import { Action, ActionOptions } from '@dao-dao/types'

import { makeMintAction } from '../actions'

export const useActions = (options: ActionOptions) =>
  [makeMintAction(options)].filter(Boolean) as Action[]
