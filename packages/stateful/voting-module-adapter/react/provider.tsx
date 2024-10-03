import { ReactNode, useState } from 'react'

import { useDao } from '@dao-dao/stateless'
import { IVotingModuleAdapterContext } from '@dao-dao/types'

import { matchAndLoadAdapter } from '../core'
import { VotingModuleAdapterContext } from './context'

// Ensure this re-renders when the voting module contract name or options
// addresses change. You can do this by setting a `key` on this component or one
// of its ancestors. See DaoProviders.tsx where this component is used.
export const VotingModuleAdapterProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const dao = useDao()
  const [context] = useState<IVotingModuleAdapterContext>(() =>
    matchAndLoadAdapter(dao)
  )

  return (
    <VotingModuleAdapterContext.Provider value={context}>
      {children}
    </VotingModuleAdapterContext.Provider>
  )
}
