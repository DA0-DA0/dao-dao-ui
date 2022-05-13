import { useRouter } from 'next/router'
import { FunctionComponent, SuspenseProps, Suspense } from 'react'
import { useRecoilValue } from 'recoil'

import { mountedInBrowserAtom } from '@dao-dao/state'

import ErrorBoundary from './ErrorBoundary'

interface SuspenseLoaderProps extends SuspenseProps {
  forceFallback?: boolean
}

export const SuspenseLoader: FunctionComponent<SuspenseLoaderProps> = ({
  fallback,
  children,
  forceFallback,
  ...props
}) => {
  const { isFallback, isReady } = useRouter()

  // Prevent loading on the server since Next.js cannot intuitively
  // pre-render Suspenses.
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  return mountedInBrowser && !(forceFallback || isFallback || !isReady) ? (
    <ErrorBoundary title="An unexpected error occurred.">
      <Suspense fallback={fallback} {...props}>
        {children}
      </Suspense>
    </ErrorBoundary>
  ) : (
    <>{fallback}</>
  )
}
