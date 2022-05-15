import { FunctionComponent } from 'react'

import {
  SuspenseLoader as StatelessSuspenseLoader,
  SuspenseLoaderProps,
} from '@dao-dao/ui/components/SuspenseLoader'

import { ErrorBoundary } from '.'

export const SuspenseLoader: FunctionComponent<
  Omit<SuspenseLoaderProps, 'ErrorBoundaryComponent'>
> = ({ children, ...props }) => (
  <StatelessSuspenseLoader ErrorBoundaryComponent={ErrorBoundary} {...props}>
    {children}
  </StatelessSuspenseLoader>
)
