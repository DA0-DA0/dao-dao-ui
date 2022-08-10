import { useWalletManager } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { WalletProvider } from '@dao-dao/common'
import { mountedInBrowserAtom } from '@dao-dao/state'
import { usePlatform } from '@dao-dao/utils'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  installWarningVisibleAtom,
  noKeplrAccountAtom,
} from '@/atoms'

import { BetaWarningModal } from './BetaWarning'
import { CommandModal } from './CommandModal'
import { InstallKeplr } from './InstallKeplr'
import { Nav } from './Nav'
import { NoKeplrAccountModal } from './NoKeplrAccountModal'

const AppLayoutInner = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter()
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [noKeplrAccount, setNoKeplrAccount] = useRecoilState(noKeplrAccountAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [commandModalVisible, setCommandModalVisible] = useRecoilState(
    commandModalVisibleAtom
  )

  //! WALLET CONNECTION ERROR MODALS
  const { error } = useWalletManager()
  useEffect(() => {
    setInstallWarningVisible(
      error instanceof Error &&
        error.message === 'Failed to retrieve wallet client.'
    )
    setNoKeplrAccount(
      error instanceof Error && error.message === "key doesn't exist"
    )
  }, [error, setInstallWarningVisible, setNoKeplrAccount])

  //! COMMAND MODAL
  // Hide modal when we nav away.
  useEffect(() => {
    setCommandModalVisible(false)
  }, [router.asPath, setCommandModalVisible])
  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()
  // Handle keypress to show command modal or not.
  const handleKeyPress = useCallback(
    (event) => {
      if ((!isMac && event.ctrlKey) || event.metaKey) {
        if (event.key === 'k') {
          setCommandModalVisible((showSearch) => !showSearch)
        }
      }
    },
    [isMac, setCommandModalVisible]
  )
  // Setup command modal keypress.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <>
      {installWarningVisible && (
        <InstallKeplr onClose={() => setInstallWarningVisible(false)} />
      )}
      {noKeplrAccount && (
        <NoKeplrAccountModal onClose={() => setNoKeplrAccount(false)} />
      )}
      {mountedInBrowser && !betaWarningAccepted && (
        <BetaWarningModal onAccept={() => setBetaWarningAccepted(true)} />
      )}
      {commandModalVisible && (
        <CommandModal onClose={() => setCommandModalVisible(false)} />
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

const AppLayoutLoadingInner = ({ children }: PropsWithChildren<{}>) => (
  <main className="overflow-hidden w-full h-full min-h-screen">{children}</main>
)

export const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  const { isFallback } = useRouter()

  // Don't mount wallet or modals while static page data is still loading.
  // Things look weird and broken, and the wallet connects twice. Nav in
  // AppLayoutInner above uses wallet hook, which depends on WalletProvider, so
  // use placeholder Layout during fallback.
  return isFallback ? (
    <AppLayoutLoadingInner>{children}</AppLayoutLoadingInner>
  ) : (
    <WalletProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </WalletProvider>
  )
}
