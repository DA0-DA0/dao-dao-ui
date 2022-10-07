// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { CommandModal } from '@dao-dao/command'
import {
  PfpkNftSelectionModal,
  SidebarWallet,
  WalletProvider,
} from '@dao-dao/common'
import {
  SubQueryProvider,
  mountedInBrowserAtom,
  navigationCompactAtom,
  pinnedDaoDropdownInfosSelector,
  refreshBlockHeightAtom,
  refreshTokenUsdcPriceIdAtom,
  usdcPerMacroTokenSelector,
  useCachedLoadable,
  useWalletProfile,
} from '@dao-dao/state'
import { IAppLayoutContext, AppLayout as StatelessAppLayout } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  loadableToLoadingData,
  nativeTokenLabel,
  usePlatform,
} from '@dao-dao/utils'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  installWarningVisibleAtom,
  noKeplrAccountAtom,
} from '@/atoms'

import { BetaWarningModal } from './BetaWarning'
import { DAppProvider, useDAppContext } from './DAppContext'
import { InstallKeplr } from './InstallKeplr'
import { NoKeplrAccountModal } from './NoKeplrAccountModal'

const AppLayoutInner = ({ children }: PropsWithChildren<{}>) => {
  const { t } = useTranslation()
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
  const { error, status } = useWalletManager()
  const { walletProfile } = useWalletProfile()
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
  const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
    useState(false)
  const [updateProfileNftVisible, setUpdateProfileNftVisible] = useState(false)
  const appLayoutContext: Omit<
    IAppLayoutContext,
    'RightSidebarContent' | 'PageHeader'
  > = useMemo(
    () => ({
      responsiveNavigation: {
        enabled: responsiveNavigationEnabled,
        toggle: () => setResponsiveNavigationEnabled((v) => !v),
      },
      responsiveRightSidebar: {
        enabled: responsiveRightSidebarEnabled,
        toggle: () => setResponsiveRightSidebarEnabled((v) => !v),
      },
      updateProfileNft: {
        visible: updateProfileNftVisible,
        toggle: () => setUpdateProfileNftVisible((v) => !v),
      },
    }),
    [
      responsiveNavigationEnabled,
      responsiveRightSidebarEnabled,
      updateProfileNftVisible,
    ]
  )

  //! Token prices
  const setRefreshTokenUsdcPriceId = useSetRecoilState(
    refreshTokenUsdcPriceIdAtom(NATIVE_DENOM)
  )
  const usdcPricePerMacroNativeLoadable = useCachedLoadable(
    usdcPerMacroTokenSelector({
      denom: NATIVE_DENOM,
      decimals: NATIVE_DECIMALS,
    })
  )
  // Refresh native token price every minute.
  useEffect(() => {
    const interval = setInterval(
      () => setRefreshTokenUsdcPriceId((id) => id + 1),
      60 * 1000
    )
    return () => clearInterval(interval)
  }, [setRefreshTokenUsdcPriceId])

  //! Block height
  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)
  // Refresh block height every minute.
  useEffect(() => {
    const interval = setInterval(
      () => setRefreshBlockHeight((id) => id + 1),
      60 * 1000
    )
    return () => clearInterval(interval)
  }, [setRefreshBlockHeight])

  //! Pinned DAOs
  const pinnedDaoDropdownInfosLoadable = useCachedLoadable(
    pinnedDaoDropdownInfosSelector
  )

  //! Loadable errors.
  useEffect(() => {
    if (usdcPricePerMacroNativeLoadable.state === 'hasError') {
      console.error(usdcPricePerMacroNativeLoadable.contents)
    }
    if (pinnedDaoDropdownInfosLoadable.state === 'hasError') {
      console.error(pinnedDaoDropdownInfosLoadable.contents)
    }
  }, [
    usdcPricePerMacroNativeLoadable.contents,
    usdcPricePerMacroNativeLoadable.state,
    pinnedDaoDropdownInfosLoadable.contents,
    pinnedDaoDropdownInfosLoadable.state,
  ])

  //! Inbox
  const { inbox } = useDAppContext()
  // Inbox notifications
  const [lastProposalCount, setLastProposalCount] = useState(
    inbox.proposalCount
  )
  useEffect(() => {
    if (inbox.proposalCount > lastProposalCount) {
      setTimeout(
        () =>
          toast.success(
            t('info.openProposalsInInbox', {
              count: inbox.proposalCount,
            })
          ),
        // 3 second delay.
        3 * 1000
      )
    }
    setLastProposalCount(inbox.proposalCount)
  }, [inbox.proposalCount, lastProposalCount, t])

  return (
    <>
      <InstallKeplr
        onClose={() => setInstallWarningVisible(false)}
        visible={installWarningVisible}
      />
      <NoKeplrAccountModal
        onClose={() => setNoKeplrAccount(false)}
        visible={noKeplrAccount}
      />
      {mountedInBrowser && !betaWarningAccepted && (
        <BetaWarningModal onAccept={() => setBetaWarningAccepted(true)} />
      )}

      <CommandModal
        setVisible={setCommandModalVisible}
        visible={commandModalVisible}
      />

      {updateProfileNftVisible && (
        <PfpkNftSelectionModal
          onClose={() => setUpdateProfileNftVisible(false)}
        />
      )}

      <StatelessAppLayout
        context={appLayoutContext}
        navigationProps={{
          inboxCount: inbox.loading
            ? {
                loading: true,
              }
            : {
                loading: false,
                data: inbox.proposalCount,
              },
          setCommandModalVisible: () => setCommandModalVisible(true),
          tokenPrices:
            usdcPricePerMacroNativeLoadable.state === 'loading'
              ? { loading: true }
              : {
                  loading: false,
                  data:
                    usdcPricePerMacroNativeLoadable.state === 'hasValue' &&
                    usdcPricePerMacroNativeLoadable.contents
                      ? [
                          {
                            label: nativeTokenLabel(NATIVE_DENOM),
                            price: Number(
                              usdcPricePerMacroNativeLoadable.contents.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 3,
                                }
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
          pinnedDaos: loadableToLoadingData(pinnedDaoDropdownInfosLoadable, []),
          compact,
          setCompact,
        }}
        rightSidebarProps={{
          wallet: <SidebarWallet />,
        }}
        walletProfile={
          status === WalletConnectionStatus.Connected
            ? walletProfile
            : undefined
        }
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
      <SubQueryProvider>
        <DAppProvider>
          <AppLayoutInner>{children}</AppLayoutInner>
        </DAppProvider>
      </SubQueryProvider>
    </WalletProvider>
  )
}
