import Head from 'next/head'
import { FC, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { WalletProvider, mountedInBrowserAtom, useWallet } from '@dao-dao/state'
import { KeplrNotInstalledError, SITE_TITLE } from '@dao-dao/utils'

import { BetaWarningModal } from './BetaWarning'
import { InstallKeplr } from './InstallKeplr'
import { Nav } from './Nav'
import { NoKeplrAccountModal } from './NoKeplrAccountModal'
import {
  betaWarningAcceptedAtom,
  installWarningVisibleAtom,
  noKeplrAccountAtom,
} from '@/atoms'

export const SidebarLayoutInner: FC = ({ children }) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [noKeplrAccount, setNoKeplrAccount] = useRecoilState(noKeplrAccountAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )

  const { connectionError } = useWallet()
  useEffect(() => {
    setInstallWarningVisible(connectionError instanceof KeplrNotInstalledError)
    setNoKeplrAccount(
      connectionError instanceof Error &&
        connectionError.message === "key doesn't exist"
    )
  }, [connectionError, setInstallWarningVisible, setNoKeplrAccount])

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <link href="/daodao-dark.svg" rel="icon" type="image/svg+xml" />
        <link href="/yin_yang.png" rel="icon" />
      </Head>

      {installWarningVisible && (
        <InstallKeplr onClose={() => setInstallWarningVisible(false)} />
      )}
      {noKeplrAccount && (
        <NoKeplrAccountModal onClose={() => setNoKeplrAccount(false)} />
      )}
      {mountedInBrowser && !betaWarningAccepted && (
        <BetaWarningModal onAccept={() => setBetaWarningAccepted(true)} />
      )}

      <div className="w-full h-full lg:grid lg:grid-cols-[264px_repeat(4,minmax(0,1fr))]">
        <div className="hidden lg:block lg:w-[264px]">
          <Nav />
        </div>

        <main className="overflow-hidden min-h-screen lg:col-span-4 lg:col-start-2">
          {children}
        </main>
      </div>
    </>
  )
}

export const SidebarLayout: FC = ({ children }) => (
  <WalletProvider>
    <SidebarLayoutInner>{children}</SidebarLayoutInner>
  </WalletProvider>
)
