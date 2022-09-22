import { useMemo } from 'react'

import { ContractVersion } from '@dao-dao/tstypes'
import { Action } from '@dao-dao/tstypes/actions'

import { getDaoActions } from '../actions'

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
    [additionalActions, coreVersion]
  )
