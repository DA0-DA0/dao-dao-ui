import { useMemo } from 'react'

import { actions } from '../actions'
import { Action, ActionKey } from '../types'

export const useActionsWithoutDisabledKeys = (
  disabledKeys: ActionKey[]
): Action[] =>
  useMemo(
    () => actions.filter(({ key }) => !disabledKeys.includes(key)),
    [disabledKeys]
  )
