import { Component, ErrorInfo, ReactNode } from 'react'

// eslint-disable-next-line regex/invalid
import { _probablyDontUseThisI18n, withTranslation } from '@dao-dao/i18n'
import { ErrorPage } from '@dao-dao/ui'

interface ErrorBoundaryProps {
  children: ReactNode
  title?: string
  // Ok to use here for type checking.
  // eslint-disable-next-line regex/invalid
  i18n?: typeof _probablyDontUseThisI18n
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
    const { title = this.props.i18n?.t('unexpectedError') ?? '', children } =
      this.props

    return this.state.hasError ? (
      <ErrorPage title={title}>
        <p>{this.props.i18n?.t('checkInternetOrTryAgain')}</p>
      </ErrorPage>
    ) : (
      children
    )
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryInner)
