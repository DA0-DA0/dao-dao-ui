import { Component, ErrorInfo, ReactNode } from 'react'

import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'

type ErrorBoundaryProps = {
  children: ReactNode
  router: NextRouter
  title: string
}

type ErrorBoundaryState = {
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
    const { router, title, children } = this.props
    if (this.state.hasError) {
      return (
        <div className="max-w-prose break-words p-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-3">
            We couldn{"'"}t find the contract with address
            <br />
            <code>{router.query.contractAddress}</code>.
            <br />
            Consider returning{' '}
            <Link href="/">
              <a className="link">home</a>
            </Link>
          </p>
        </div>
      )
    }
    // Can add more errors with different paths here

    return children
  }
}

export default function ErrorBoundary(props: {
  children: ReactNode
  title: string
}) {
  return <ErrorBoundaryHelper {...props} router={useRouter()} />
}
