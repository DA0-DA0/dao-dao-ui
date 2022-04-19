import { Component, ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
  title: string
}

type ErrorBoundaryState = {
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
    const { title, children } = this.props
    if (this.state.hasError) {
      return (
        <div className="p-6 mx-auto max-w-prose break-words">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-3">
            Check your internet connection or try again later.
          </p>
        </div>
      )
    }

    return children
  }
}
