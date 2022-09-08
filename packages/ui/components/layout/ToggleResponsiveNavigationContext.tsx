import { createContext, useContext } from 'react'

export const ToggleResponsiveNavigationContext = createContext<
  (() => void) | null
>(null)

export const useToggleResponsiveNavigationContext = () => {
  const context = useContext(ToggleResponsiveNavigationContext)
  if (!context) {
    throw new Error(
      'Missing ToggleResponsiveNavigationContext.Provider wrapper.'
    )
  }

  return context
}
