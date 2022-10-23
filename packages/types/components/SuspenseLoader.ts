import { ComponentType, ReactNode, SuspenseProps } from 'react'

export interface SuspenseLoaderProps extends SuspenseProps {
  ErrorBoundaryComponent?: ComponentType<{ children: ReactNode }>
  forceFallback?: boolean
}
