import { useMemo } from 'react'

import { Action } from '@dao-dao/tstypes/actions'

import { daoActions } from '../actions'

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
