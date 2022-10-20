import { useMemo } from 'react'

import { useActionOptions } from '@dao-dao/actions/react/context'
import { Action, IProposalModuleAdapterCommonOptions } from '@dao-dao/tstypes'

import {
  makeUpdatePreProposeConfigAction,
  makeUpdateProposalConfigV1Action,
  makeUpdateProposalConfigV2Action,
} from '../actions'

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
          makeUpdateProposalConfigV1Action(options),
          makeUpdateProposalConfigV2Action(options),
          makeUpdatePreProposeConfigAction(options),
        ]
          // Remove null values, since maker functions return null if they don't
          // make sense in the context (such as the v2 config action for a v1
          // proposal module).
          .filter(Boolean) as Action[]
      )
    }, [_options])
  }
