// import { useWalletManager } from '@noahsaso/cosmodal'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

// import { WalletProvider } from '@dao-dao/common'
import { mountedInBrowserAtom } from '@dao-dao/state'
import { SITE_TITLE, usePlatform } from '@dao-dao/utils'

import { BetaWarningModal } from './BetaWarning'
import { InstallKeplr } from './InstallKeplr'
import { Nav } from './Nav'
import { NoKeplrAccountModal } from './NoKeplrAccountModal'
import { SearchModal } from './SearchModal'
import {
  betaWarningAcceptedAtom,
  installWarningVisibleAtom,
  noKeplrAccountAtom,
  searchVisibleAtom,
} from '@/atoms'

const SidebarLayoutInner: FC = ({ children }) => {
  const router = useRouter()
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [noKeplrAccount, setNoKeplrAccount] = useRecoilState(noKeplrAccountAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [searchVisible, setSearchVisible] = useRecoilState(searchVisibleAtom)

  //! WALLET CONNECTION ERROR MODALS
  // const { error } = useWalletManager()
  const error: unknown = undefined
  useEffect(() => {
    setInstallWarningVisible(
      error instanceof Error &&
        error.message === 'Failed to retrieve wallet client.'
    )
    setNoKeplrAccount(
      error instanceof Error && error.message === "key doesn't exist"
    )
  }, [error, setInstallWarningVisible, setNoKeplrAccount])

  //! SEARCH MODAL
  // Hide modal when we nav away.
  useEffect(() => {
    setSearchVisible(false)
  }, [router.asPath, setSearchVisible])
  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()
  // Handle keypress to show search or not.
  const handleKeyPress = useCallback(
    (event) => {
      if ((!isMac && event.ctrlKey) || event.metaKey) {
        if (event.key === 'k') {
          setSearchVisible((showSearch) => !showSearch)
        }
      }
    },
    [isMac, setSearchVisible]
  )
  // Setup search keypress.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

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
      {searchVisible && <SearchModal onClose={() => setSearchVisible(false)} />}

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
  // <WalletProvider>
  <SidebarLayoutInner>{children}</SidebarLayoutInner>
  // </WalletProvider>
)
