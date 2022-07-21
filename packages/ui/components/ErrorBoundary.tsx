import { Component, ErrorInfo, ReactNode } from 'react'
import { WithTranslationProps, withTranslation } from 'react-i18next'

import { ErrorPage } from '@dao-dao/ui'
import { VERCEL_ENV } from '@dao-dao/utils'

interface ErrorBoundaryProps extends WithTranslationProps {
  children: ReactNode
  title?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
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
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    const {
      title = this.props.i18n?.t('error.unexpectedError') ?? '',
      children,
    } = this.props

    return this.state.hasError ? (
      <ErrorPage title={title}>
        <p>{this.props.i18n?.t('error.checkInternetOrTryAgain')}</p>
        {VERCEL_ENV === 'preview' && (
          <pre className="mt-8 text-xs text-mono">
            {this.state.error?.message}
          </pre>
        )}
      </ErrorPage>
    ) : (
      children
    )
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryInner)
