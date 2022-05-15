import { Component, ErrorInfo, ReactNode } from 'react'

import { ErrorPage } from '@dao-dao/ui'

interface ErrorBoundaryProps {
  children: ReactNode
  title?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

// React does not have functional Error Boundaries yet
export class ErrorBoundary extends Component<
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
    const { title = 'An unexpected error occurred.', children } = this.props

    return this.state.hasError ? (
      <ErrorPage title={title}>
        <p>Check your internet connection or try again later.</p>
      </ErrorPage>
    ) : (
      children
    )
  }
}
