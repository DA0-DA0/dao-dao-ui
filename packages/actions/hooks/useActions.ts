import { useMemo } from 'react'

import { Action } from '@dao-dao/tstypes/actions'

import { getDaoActions } from '../actions'
import { ContractVersion } from '@dao-dao/tstypes'

export const useActions = (
  coreVersion: ContractVersion,
  additionalActions?: Action[]
): Action[] =>
  useMemo(
    () =>
      getDaoActions(coreVersion)
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    [additionalActions]
  )
