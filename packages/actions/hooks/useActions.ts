import { useMemo } from 'react'

import { actions } from '../actions'
import { Action, ActionKey } from '../types'

export const useActions = (
  disabledKeys: ActionKey[],
  additionalActions?: Action[]
): Action[] =>
  useMemo(
    () =>
      actions
        .filter(({ key }) => !disabledKeys.includes(key))
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    [additionalActions, disabledKeys]
  )
