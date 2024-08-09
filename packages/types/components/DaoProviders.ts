import { ComponentType, ReactNode } from 'react'

import { LoaderProps } from './Loader'

export type DaoProvidersProps = {
  chainId: string
  /**
   * Passing an empty string will start in a loading state.
   */
  coreAddress: string
  children: ReactNode
  /**
   * Optionally override the loader with a rendered React node. Takes precedence
   * over `LoaderFallback`.
   */
  loaderFallback?: ReactNode
  /**
   * Optionally override the Loader class to be rendered with no props.
   */
  LoaderFallback?: ComponentType<LoaderProps>
}
