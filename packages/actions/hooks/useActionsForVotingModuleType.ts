import { useMemo } from 'react'

import { VotingModuleType } from '@dao-dao/utils'

import { actions } from '../actions'
import { Action } from '../types'

export const useActionsForVotingModuleType = (
  type: VotingModuleType
): Action[] =>
  useMemo(
    () =>
      actions.filter(({ votingModuleTypes }) =>
        votingModuleTypes.includes(type)
      ),
    [type]
  )
