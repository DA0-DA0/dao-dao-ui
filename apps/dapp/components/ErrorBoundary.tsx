import Link from 'next/link'
import { withRouter, Router } from 'next/router'
import { Component, ErrorInfo, ReactNode } from 'react'

import { ErrorPage } from '@dao-dao/ui'

interface ErrorBoundaryProps {
  router: Router
  children: ReactNode
  title?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

// React does not have functional Error Boundaries yet
class ErrorBoundaryHelper extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    const {
      router,
      title = 'An unexpected error occurred.',
      children,
    } = this.props

    return this.state.hasError ? (
      router.pathname.startsWith('/org') ? (
        <ErrorPage title={title}>
          <p>
            We couldn{"'"}t find the contract with address
            <br />
            <code>{router.query.address}</code>.
            <br />
            Consider returning{' '}
            <Link href="/">
              <a className="link">home</a>
            </Link>
          </p>
        </ErrorPage>
      ) : (
        <ErrorPage title={title}>
          <p>
            This could happen because the RPC node DAO DAO uses is down. Please
            try again later.
          </p>
        </ErrorPage>
      )
    ) : (
      children
    )
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryHelper)
