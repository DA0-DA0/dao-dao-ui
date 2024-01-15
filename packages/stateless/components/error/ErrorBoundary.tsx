/* eslint-disable i18next/no-literal-string */
import { Component, ErrorInfo, ReactNode } from 'react'
import { WithTranslationProps, withTranslation } from 'react-i18next'

import { processError } from '@dao-dao/utils'

import { ErrorPage } from './ErrorPage'

interface ErrorBoundaryProps extends WithTranslationProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: string
}

// React does not have functional Error Boundaries yet
class ErrorBoundaryInner extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: processError(error) }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    return this.state.hasError ? (
      <ErrorPage
        className="!gap-2"
        error={this.state.error}
        title={
          this.props.i18n?.t?.('error.unexpectedError') ??
          'An unexpected error occurred.'
        }
        titleClassName="!title-text"
      />
    ) : (
      this.props.children
    )
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryInner)
