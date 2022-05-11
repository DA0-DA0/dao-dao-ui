import Head from 'next/head'
import { FC, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  mountedInBrowserAtom,
  useWallet,
  WalletNotInstalledError,
} from '@dao-dao/state'
import { SITE_TITLE } from '@dao-dao/utils'

import { BetaWarningModal } from './BetaWarning'
import { InstallKeplr } from './InstallKeplr'
import { Nav } from './Nav'
import { NoKeplrAccountModal } from './NoKeplrAccountModal'
import { betaWarningAcceptedAtom } from '@/atoms/status'
import { noKeplrAccountAtom } from '@/selectors/cosm'
import { installWarningVisibleAtom } from '@/selectors/cosm'

export const SidebarLayout: FC = ({ children }) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [noKeplrAccount, setNoKeplrAccount] = useRecoilState(noKeplrAccountAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )

  const { connectError } = useWallet()
  useEffect(() => {
    setInstallWarningVisible(connectError instanceof WalletNotInstalledError)
    setNoKeplrAccount(
      connectError instanceof Error &&
        connectError.message === "key doesn't exist"
    )
  }, [connectError, setInstallWarningVisible, setNoKeplrAccount])

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

        <main className="overflow-hidden w-screen min-h-screen lg:col-span-4 lg:col-start-2">
          {children}
        </main>
      </div>
    </>
  )
}
