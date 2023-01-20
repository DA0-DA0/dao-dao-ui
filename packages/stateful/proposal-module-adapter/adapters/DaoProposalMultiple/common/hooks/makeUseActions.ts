import { useMemo } from 'react'

import { Action, IProposalModuleAdapterCommonOptions } from '@dao-dao/types'

import { useActionOptions } from '../../../../../actions'
import { makeUpdatePreProposeConfigAction } from '../actions'
import { makeUpdateProposalConfigAction } from '../actions/makeUpdateProposalConfigAction'

export const makeUseActions =
  ({ proposalModule }: IProposalModuleAdapterCommonOptions) =>
  (): Action[] => {
    const _options = useActionOptions()

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
