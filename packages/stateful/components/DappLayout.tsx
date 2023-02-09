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
  InstallKeplrModal,
  NoKeplrAccountModal,
  ProposalCreatedModal,
  DappLayout as StatelessDappLayout,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  CommandModalContextMaker,
  DaoPageMode,
  IAppLayoutContext,
} from '@dao-dao/types'
import { loadableToLoadingData, usePlatform } from '@dao-dao/utils'

import { CommandModal, makeGenericContext } from '../command'
import { useDaoWebSocket, useFollowingDaos, useWalletInfo } from '../hooks'
import { useInbox } from '../inbox'
import {
  daoCreatedCardPropsAtom,
  followingDaoDropdownInfosSelector,
} from '../recoil'
import { ConnectWallet } from './ConnectWallet'
import { IconButtonLink } from './IconButtonLink'
import { LinkWrapper } from './LinkWrapper'
import { PfpkNftSelectionModal } from './PfpkNftSelectionModal'
import { SidebarWallet } from './SidebarWallet'
import { SyncFollowingModal } from './SyncFollowingModal'
import { WalletFiatRampModal } from './WalletFiatRampModal'

export const DappLayout = ({ children }: { children: ReactNode }) => {
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
  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()
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
  const [lastProposalCount, setLastProposalCount] = useState(inbox.itemCount)
  useEffect(() => {
    if (inbox.itemCount > lastProposalCount) {
      setTimeout(
        () =>
          toast.success(
            t('info.itemsInInboxNotification', {
              count: inbox.itemCount,
            })
          ),
        // 3 second delay.
        3 * 1000
      )
    }
    setLastProposalCount(inbox.itemCount)
  }, [inbox.itemCount, lastProposalCount, t])

  //! AppLayoutContext
  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)
  const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
    useState(false)
  const [updateProfileNftVisible, setUpdateProfileNftVisible] = useState(false)
  const daoWebSocket = useDaoWebSocket()
  const appLayoutContext: Omit<
    IAppLayoutContext,
    'RightSidebarContent' | 'PageHeader'
  > = useMemo(
    () => ({
      mode: DaoPageMode.Dapp,
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
      daoWebSocket,
    }),
    [
      daoWebSocket,
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

  //! Following DAOs
  const followingDaoDropdownInfosLoadable = useCachedLoadable(
    followingDaoDropdownInfosSelector
  )

  //! Loadable errors.
  useEffect(() => {
    if (followingDaoDropdownInfosLoadable.state === 'hasError') {
      console.error(followingDaoDropdownInfosLoadable.contents)
    }
  }, [
    followingDaoDropdownInfosLoadable.contents,
    followingDaoDropdownInfosLoadable.state,
  ])

  return (
    <StatelessDappLayout
      connect={connect}
      connectWalletButton={<ConnectWallet variant="secondary" />}
      connected={connected}
      context={appLayoutContext}
      navigationProps={{
        walletConnected: connected,
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
                data: inbox.itemCount,
              },
        setCommandModalVisible: () => setCommandModalVisible(true),
        version: '2.0',
        followingDaos: mountedInBrowser
          ? loadableToLoadingData(followingDaoDropdownInfosLoadable, [])
          : // Prevent hydration errors by loading until mounted.
            { loading: true },
        compact,
        setCompact,
        mountedInBrowser,
      }}
      rightSidebarProps={{
        wallet: <SidebarWallet />,
        WalletFiatRampModal: connected ? WalletFiatRampModal : undefined,
      }}
      walletProfile={
        status === WalletConnectionStatus.Connected ? walletProfile : undefined
      }
    >
      {children}

      {/* Modals */}

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
      <SyncFollowingModal />

      {updateProfileNftVisible && (
        <PfpkNftSelectionModal
          onClose={() => setUpdateProfileNftVisible(false)}
        />
      )}

      {daoCreatedCardProps && (
        <DaoCreatedModal
          itemProps={{
            ...daoCreatedCardProps,

            follow: {
              following: isFollowing(daoCreatedCardProps.coreAddress),
              updatingFollowing,
              onFollow: () =>
                isFollowing(daoCreatedCardProps.coreAddress)
                  ? setUnfollowing(daoCreatedCardProps.coreAddress)
                  : setFollowing(daoCreatedCardProps.coreAddress),
            },
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
    </StatelessDappLayout>
  )
}
