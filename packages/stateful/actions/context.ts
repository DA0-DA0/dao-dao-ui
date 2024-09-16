import { useMemo } from 'react'

import { useActionOptions } from '@dao-dao/stateless'
import { ActionContextType, ActionEncodeContext } from '@dao-dao/types'

import { useProposalModuleAdapterCommonContextIfAvailable } from '../proposal-module-adapter/react/context'

/**
 * Get encode context. If in a DAO, must be used inside a proposal module common
 * context.
 */
export const useActionEncodeContext = (): ActionEncodeContext => {
  const { context } = useActionOptions()

  const proposalModule =
    useProposalModuleAdapterCommonContextIfAvailable()?.options.proposalModule
  if (context.type === ActionContextType.Dao && !proposalModule) {
    throw new Error('Proposal module not available in DAO context.')
  }

  return useMemo(
    (): ActionEncodeContext =>
      context.type === ActionContextType.Dao
        ? {
            ...context,
            proposalModule: proposalModule!,
          }
        : context,
    [context, proposalModule]
  )
}
