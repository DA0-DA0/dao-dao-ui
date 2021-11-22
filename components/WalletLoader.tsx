import { ReactNode } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useSigningClient } from 'contexts/cosmwasm'
import { isKeplrInstalled } from 'services/keplr'
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
    const hasKeplr = isKeplrInstalled()
    let keplrLink
    if (hasKeplr) {
      keplrLink = (
        <>
          <p>DAODAO is a Decentralized App (&quot;dApp&quot;).</p>
          <p>
            Please connect your{' '}
            <a
              className="link link-primary link-hover"
              href="https://keplr.app/"
            >
              Keplr wallet
            </a>
          </p>
        </>
      )
    } else {
      keplrLink = (
        <p className="mt-8 text-xl">
          Get started by installing{' '}
          <a className="link link-primary link-hover" href="https://keplr.app/">
            Keplr wallet
          </a>
          , then reload this page.
        </p>
      )
    }
    const connectButton = hasKeplr ? (
      <button
        className="p-6 mt-6 text-left border border-secondary hover:border-primary rounded-xl hover:text-primary focus:text-primary-focus"
        onClick={connectWallet}
      >
        <h3 className="text-2xl font-bold">
          Connect your wallet{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
      </button>
    ) : (
      <button className="p-6 mt-6 text-left border border-secondary hover:border-primary rounded-xl hover:text-primary focus:text-primary-focus">
        <a href="https://keplr.app">
          <h3 className="text-2xl font-bold">
            Get Keplr{' '}
            <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
          </h3>
        </a>
      </button>
    )
    return (
      <>
        {children}
        <div className="modal modal-open">
          <div className="modal-box">
            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION && (
              <h3 className="mt-3 text-4xl">
                {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
              </h3>
            )}
            {keplrLink}
            <div className="modal-action">{connectButton}</div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <>{children}</>
}

export default WalletLoader
