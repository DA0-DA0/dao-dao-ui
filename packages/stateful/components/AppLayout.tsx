// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  installWarningVisibleAtom,
  mountedInBrowserAtom,
  navigationCompactAtom,
  noKeplrAccountAtom,
  proposalCreatedCardPropsAtom,
  refreshBlockHeightAtom,
  refreshTokenUsdcPriceAtom,
} from '@dao-dao/state'
import {
  BetaWarningModal,
  DaoCreatedModal,
  IAppLayoutContext,
  InstallKeplrModal,
  NoKeplrAccountModal,
  ProposalCreatedModal,
  AppLayout as StatelessAppLayout,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { CommandModalContextMaker } from '@dao-dao/types'
import { loadableToLoadingData, usePlatform } from '@dao-dao/utils'

import { CommandModal, makeGenericContext } from '../command'
import { useInbox, usePinnedDaos, useWalletInfo } from '../hooks'
import {
  daoCreatedCardPropsAtom,
  followedDaoDropdownInfosSelector,
} from '../recoil'
import { ConnectWallet } from './ConnectWallet'
import { IconButtonLink } from './IconButtonLink'
import { LinkWrapper } from './LinkWrapper'
import { PfpkNftSelectionModal } from './PfpkNftSelectionModal'
import { SidebarWallet } from './SidebarWallet'

export const AppLayout = ({ children }: { children: ReactNode }) => {
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
  // DAO creation modal that persists when navigating from create page to DAO
  // page.
  const { isPinned, setPinned, setUnpinned } = usePinnedDaos()
  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )
  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

  //! WALLET CONNECTION ERROR MODALS
  const { connect, connected, error, status } = useWalletManager()
  const {
    walletAddress,
    walletProfile,
    refreshBalances: refreshWalletBalances,
  } = useWalletInfo()
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
  const [rootCommandContextMaker, _setRootCommandContextMaker] =
    useState<CommandModalContextMaker>(
      // makeGenericContext is a function, and useState allows passing a
      // function that executes immediately and returns the initial value for
      // the state. Thus, pass a function that is called immediately, which
      // returns the function we want to set.
      () => makeGenericContext
    )
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

  //! Inbox
  const inbox = useInbox()
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

  //! AppLayoutContext
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
      setRootCommandContextMaker: (maker) =>
        // See comment in `_setRootCommandContextMaker` for an explanation on
        // why we pass a function here.
        _setRootCommandContextMaker(() => maker),
      inbox,
    }),
    [
      inbox,
      responsiveNavigationEnabled,
      responsiveRightSidebarEnabled,
      updateProfileNftVisible,
    ]
  )

  //! Refresh every minute. Block height, USDC conversions, and wallet balances.
  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)
  const setRefreshUsdcPrices = useSetRecoilState(refreshTokenUsdcPriceAtom(''))
  // Refresh block height and wallet balances every minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshBlockHeight((id) => id + 1)
      setRefreshUsdcPrices((id) => id + 1)
      if (walletAddress) {
        refreshWalletBalances()
      }
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [
    refreshWalletBalances,
    setRefreshBlockHeight,
    setRefreshUsdcPrices,
    walletAddress,
  ])

  //! Pinned DAOs
  const followedDaoDropdownInfosLoadable = useCachedLoadable(
    followedDaoDropdownInfosSelector
  )

  //! Loadable errors.
  useEffect(() => {
    if (followedDaoDropdownInfosLoadable.state === 'hasError') {
      console.error(followedDaoDropdownInfosLoadable.contents)
    }
  }, [
    followedDaoDropdownInfosLoadable.contents,
    followedDaoDropdownInfosLoadable.state,
  ])

  return (
    <>
      <InstallKeplrModal
        onClose={() => setInstallWarningVisible(false)}
        visible={installWarningVisible}
      />
      <NoKeplrAccountModal
        onClose={() => setNoKeplrAccount(false)}
        visible={noKeplrAccount}
      />
      <BetaWarningModal
        onClose={() => setBetaWarningAccepted(true)}
        visible={mountedInBrowser && !betaWarningAccepted}
      />

      <CommandModal
        makeRootContext={rootCommandContextMaker}
        setVisible={setCommandModalVisible}
        visible={commandModalVisible}
      />

      {updateProfileNftVisible && (
        <PfpkNftSelectionModal
          onClose={() => setUpdateProfileNftVisible(false)}
        />
      )}

      {daoCreatedCardProps && (
        <DaoCreatedModal
          itemProps={{
            ...daoCreatedCardProps,

            pinned: isPinned(daoCreatedCardProps.coreAddress),
            onPin: () =>
              isPinned(daoCreatedCardProps.coreAddress)
                ? setUnpinned(daoCreatedCardProps.coreAddress)
                : setPinned(daoCreatedCardProps.coreAddress),
            LinkWrapper,
            IconButtonLink,
          }}
          modalProps={{
            onClose: () => setDaoCreatedCardProps(undefined),
          }}
          subDao={!!daoCreatedCardProps.parentDao}
        />
      )}

      {proposalCreatedCardProps && (
        <ProposalCreatedModal
          itemProps={{
            ...proposalCreatedCardProps,
            LinkWrapper,
          }}
          modalProps={{
            onClose: () => setProposalCreatedCardProps(undefined),
          }}
        />
      )}

      <StatelessAppLayout
        connect={connect}
        connectWalletButton={<ConnectWallet variant="secondary" />}
        connected={connected}
        context={appLayoutContext}
        navigationProps={{
          LinkWrapper,
          inboxCount:
            inbox.loading ||
            // Prevent hydration errors by loading until mounted.
            !mountedInBrowser
              ? {
                  loading: true,
                }
              : {
                  loading: false,
                  data: inbox.proposalCount,
                },
          setCommandModalVisible: () => setCommandModalVisible(true),
          version: '2.0',
          pinnedDaos: mountedInBrowser
            ? loadableToLoadingData(followedDaoDropdownInfosLoadable, [])
            : // Prevent hydration errors by loading until mounted.
              { loading: true },
          compact,
          setCompact,
          mountedInBrowser,
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
