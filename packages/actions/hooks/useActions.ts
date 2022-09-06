import { useMemo } from 'react'

import { daoActions } from '../actions'
import { Action } from '../types'

export const useActions = (additionalActions?: Action[]): Action[] =>
  useMemo(
    () =>
      daoActions
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    [additionalActions]
  )
