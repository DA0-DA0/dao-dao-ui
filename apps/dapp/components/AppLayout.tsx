// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWalletManager } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import { SidebarWallet, WalletProvider } from '@dao-dao/common'
import {
  mountedInBrowserAtom,
  navigationCompactAtom,
  pinnedDaosDropdownInfoAtom,
  refreshTokenUsdcPriceIdAtom,
  tokenUsdcPriceSelector,
} from '@dao-dao/state'
import { AppLayout as StatelessAppLayout } from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  nativeTokenLabel,
  processError,
  usePlatform,
} from '@dao-dao/utils'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  installWarningVisibleAtom,
  noKeplrAccountAtom,
} from '@/atoms'

import { BetaWarningModal } from './BetaWarning'
import { CommandModal } from './CommandModal'
import { InstallKeplr } from './InstallKeplr'
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
  const [compact, setCompact] = useRecoilState(navigationCompactAtom)

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

  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)
  const [daoCreationPageIndex, setDaoCreationPageIndex] = useState(0)
  const appLayoutContext = useMemo(
    () => ({
      responsiveNavigation: {
        enabled: responsiveNavigationEnabled,
        toggle: () => setResponsiveNavigationEnabled((v) => !v),
      },
      daoCreation: {
        pageIndex: daoCreationPageIndex,
        setPageIndex: setDaoCreationPageIndex,
      },
    }),
    [daoCreationPageIndex, responsiveNavigationEnabled]
  )

  //! Token prices
  const setRefreshTokenUsdcPriceId = useSetRecoilState(
    refreshTokenUsdcPriceIdAtom(NATIVE_DENOM)
  )
  const nativeUsdcPriceLoadable = useRecoilValueLoadable(
    tokenUsdcPriceSelector({ denom: NATIVE_DENOM })
  )
  // Refresh native token price every minute.
  useEffect(() => {
    const interval = setInterval(
      () => setRefreshTokenUsdcPriceId((id) => id + 1),
      60 * 1000
    )
    return () => clearInterval(interval)
  }, [setRefreshTokenUsdcPriceId])

  //! Pinned DAOs
  const pinnedDaoDropdownInfos = useRecoilValueLoadable(
    pinnedDaosDropdownInfoAtom
  )

  //! Loadable errors.
  useEffect(() => {
    if (nativeUsdcPriceLoadable.state === 'hasError') {
      console.error(processError(nativeUsdcPriceLoadable.contents))
    }
    if (pinnedDaoDropdownInfos.state === 'hasError') {
      console.error(processError(pinnedDaoDropdownInfos.contents))
    }
  }, [
    nativeUsdcPriceLoadable.contents,
    nativeUsdcPriceLoadable.state,
    pinnedDaoDropdownInfos.contents,
    pinnedDaoDropdownInfos.state,
  ])

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

      <StatelessAppLayout
        context={appLayoutContext}
        navigationProps={{
          // TODO: Get inbox count.
          inboxCount: {
            loading: true,
          },
          setCommandModalVisible: () => setCommandModalVisible(true),
          tokenPrices:
            nativeUsdcPriceLoadable.state === 'loading'
              ? { loading: true }
              : {
                  loading: false,
                  data:
                    nativeUsdcPriceLoadable.state === 'hasValue' &&
                    nativeUsdcPriceLoadable.contents
                      ? [
                          {
                            label: nativeTokenLabel(NATIVE_DENOM),
                            price: Number(
                              nativeUsdcPriceLoadable.contents.toLocaleString(
                                undefined,
                                { maximumFractionDigits: 3 }
                              )
                            ),
                            priceDenom: 'USDC',
                            // TODO: Retrieve.
                            change: 13.37,
                          },
                        ]
                      : [],
                },
          version: '2.0',
          pinnedDaos:
            pinnedDaoDropdownInfos.state === 'loading'
              ? {
                  loading: true,
                }
              : {
                  loading: false,
                  data:
                    pinnedDaoDropdownInfos.state === 'hasValue'
                      ? pinnedDaoDropdownInfos.contents
                      : [],
                },
          compact,
          setCompact,
        }}
        rightSidebarProps={{
          wallet: <SidebarWallet />,
          // TODO: Get profile image URL.
          profileImageUrl: undefined,
        }}
      >
        {children}
      </StatelessAppLayout>
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
