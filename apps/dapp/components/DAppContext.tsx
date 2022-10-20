// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ReactNode, createContext, useContext } from 'react'

import { useInbox } from '@dao-dao/common'

export interface IDAppContext {
  inbox: ReturnType<typeof useInbox>
}

export const DAppContext = createContext<IDAppContext | null>(null)

export const useDAppContext = () => {
  const context = useContext(DAppContext)
  if (!context) {
    throw new Error('Missing DAppProvider wrapper.')
  }

  return context
}

export const DAppProvider = ({ children }: { children: ReactNode }) => {
  const inbox = useInbox()

  return (
    <DAppContext.Provider
      value={{
        inbox,
      }}
    >
      {children}
    </DAppContext.Provider>
  )
}
