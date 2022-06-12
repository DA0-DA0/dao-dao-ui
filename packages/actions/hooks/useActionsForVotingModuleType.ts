import { useMemo } from 'react'

import { VotingModuleType } from '@dao-dao/utils'

import { Action, actions } from '..'

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
