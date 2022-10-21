import { createContext, useContext } from 'react'

import { IAppLayoutContext } from '@dao-dao/types/ui/AppLayout'

export const AppLayoutContext = createContext<IAppLayoutContext | null>(null)

export const useAppLayoutContext = () => {
  const context = useContext(AppLayoutContext)
  if (!context) {
    throw new Error('Missing AppLayoutContext.Provider wrapper.')
  }

  return context
}
