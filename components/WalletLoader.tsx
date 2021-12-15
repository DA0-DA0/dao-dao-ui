import React, { ReactNode, useEffect, useState } from 'react'
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

  const hasKeplr = isKeplrInstalled()

  const [modalBody, setModalBody] = useState(
    <>
      <p className="mt-8 text-xl">
        Please connect your{' '}
        <a className="link link-primary link-hover" href="https://keplr.app/">
          Keplr wallet
        </a>
      </p>
      <div className="modal-action">
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
    </>
  )

  useEffect(() => {
    if (!hasKeplr) {
      setModalBody(
        <>
          <p className="mt-8 text-xl">
            Get started by installing{' '}
            <a
              className="link link-primary link-hover"
              href="https://keplr.app/"
            >
              Keplr wallet
            </a>
            , then reload this page.
          </p>
          <div className="modal-action">
            <button className="p-6 mt-6 text-left border border-secondary hover:border-primary rounded-xl hover:text-primary focus:text-primary-focus">
              <a href="https://keplr.app">
                <h3 className="text-2xl font-bold">
                  Get Keplr{' '}
                  <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
                </h3>
              </a>
            </button>
          </div>
        </>
      )
    }
  }, [walletAddress, hasKeplr])

  if (loading || clientLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    )
  }

  if (walletAddress === '') {
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
            {modalBody}
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
