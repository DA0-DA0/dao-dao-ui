import { ReactNode } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useSigningClient } from 'contexts/cosmwasm'
import Loader from './Loader'

function WalletLoader({
  children,
  loading = false,
}: {
  children: ReactNode
  loading?: boolean
}) {
  const {
    walletAddress,
    loading: clientLoading,
    error,
    connectWallet,
  } = useSigningClient()

  if (loading || clientLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    )
  }

  if (walletAddress === '') {
    return (
      <div className="max-w-full">
        <h1 className="text-6xl font-bold">
          {process.env.NEXT_PUBLIC_SITE_TITLE}
        </h1>

        {process.env.NEXT_PUBLIC_SITE_DESCRIPTION && (
          <h3 className="mt-3 text-4xl">
            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
          </h3>
        )}

        <p className="mt-8 text-xl">
          Get started by installing{' '}
          <a className="link link-primary link-hover" href="https://keplr.app/">
            Keplr wallet
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-around md:max-w-4xl mt-6 sm:w-full">
          <button
            className="p-6 mt-6 text-left border border-secondary hover:border-primary rounded-xl hover:text-primary focus:text-primary-focus"
            onClick={connectWallet}
          >
            <h3 className="text-2xl font-bold">
              Connect your wallet{' '}
              <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
            </h3>
          </button>
        </div>
      </div>
    )
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <>{children}</>
}

export default WalletLoader
