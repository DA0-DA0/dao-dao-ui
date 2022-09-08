import { createContext, useContext } from 'react'

export const ResponsiveNavigationContext = createContext<{
  enabled: boolean
  toggle: () => void
} | null>(null)

export const useResponsiveNavigationContext = () => {
  const context = useContext(ResponsiveNavigationContext)
  if (!context) {
    throw new Error('Missing ResponsiveNavigationContext.Provider wrapper.')
  }

  return context
}
