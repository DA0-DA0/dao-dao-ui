import { useMemo } from 'react'

import {
  Action,
  ActionOptions,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/types'

import {
  makeUpdatePreProposeConfigAction,
  makeUpdateProposalConfigAction,
} from '../actions'

export const makeUseActions =
  ({ proposalModule }: IProposalModuleAdapterCommonOptions) =>
  (_options: ActionOptions): Action[] => {
    return useMemo(() => {
      const options = {
        ..._options,
        proposalModule,
      }

      return (
        [
          makeUpdateProposalConfigAction(options),
          makeUpdatePreProposeConfigAction(options),
        ]
          // Remove null values, since maker functions return null if they don't
          // make sense in the context (such as the v2 config action for a v1
          // proposal module).
          .filter(Boolean) as Action[]
      )
    }, [_options])
  }
