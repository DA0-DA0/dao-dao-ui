import { ReactNode, useEffect, useState } from 'react'

import { Loader } from '@dao-dao/ui'

import { matchAndLoadAdapter } from '../core'
import { IDaoCreationAdapter } from '../types'
import { DaoCreationAdapterContext } from './context'

export interface DaoCreationAdapterProviderProps {
  id: string
  children: ReactNode | ReactNode[]
}

export const DaoCreationAdapterProvider = ({
  id,
  children,
}: DaoCreationAdapterProviderProps) => {
  const [state, setState] = useState<{
    id: string
    adapter: IDaoCreationAdapter
  }>()

  useEffect(() => {
    setState({
      id,
      adapter: matchAndLoadAdapter(id),
    })
  }, [id])

  // If `contractName` changes and state has not yet been updated with the newly
  // loaded adapter, do not render the components that expect the correct
  // adapter . Load instead.
  return state && state.id === id ? (
    <DaoCreationAdapterContext.Provider value={state.adapter}>
      {children}
    </DaoCreationAdapterContext.Provider>
  ) : (
    <Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
