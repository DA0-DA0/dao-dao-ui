import { NextRouter, Router, useRouter } from 'next/router'
import { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'
import Layout from 'components/Layout'
import Notifications from 'components/Notifications'

type ErrorBoundaryProps = {
  children: ReactNode
  router: NextRouter
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
    const router = this.props.router
    if (
      this.state.hasError &&
      router.pathname == '/multisig/[contractAddress]'
    ) {
      return (
        <Layout>
          <div className="max-w-prose break-words p-6">
            <h1 className="text-3xl font-bold">Multisig Not Found</h1>
            <p className="mt-3">
              We couldn{"'"}t find the multisig with address
              <br />
              <code>{router.query.contractAddress}</code>.
              <br />
              Consider returning{' '}
              <Link href="/">
                <a className="link">home</a>
              </Link>
            </p>
          </div>
          <Notifications />
        </Layout>
      )
    }
    // Can add more errors with different paths here

    return this.props.children
  }
}

export default function ErrorBoundary(props: { children: ReactNode }) {
  return <ErrorBoundaryHelper {...props} router={useRouter()} />
}
