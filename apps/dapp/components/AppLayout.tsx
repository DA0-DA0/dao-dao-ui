// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { CommandModal, makeGenericContext } from '@dao-dao/command'
import {
  PfpkNftSelectionModal,
  SidebarWallet,
  daoCreatedCardPropsAtom,
  pinnedDaoDropdownInfosSelector,
} from '@dao-dao/common'
import {
  mountedInBrowserAtom,
  navigationCompactAtom,
  proposalCreatedCardPropsAtom,
  refreshBlockHeightAtom,
  useCachedLoadable,
  usePinnedDaos,
  useWalletProfile,
} from '@dao-dao/state'
import { CommandModalContextMaker } from '@dao-dao/types'
import {
  BetaWarningModal,
  DaoCreatedModal,
  IAppLayoutContext,
  ProposalCreatedModal,
  AppLayout as StatelessAppLayout,
} from '@dao-dao/ui'
import { loadableToLoadingData, usePlatform } from '@dao-dao/utils'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  installWarningVisibleAtom,
  noKeplrAccountAtom,
} from '@/atoms'

import { DAppProvider, useDAppContext } from './DAppContext'
import { InstallKeplr } from './InstallKeplr'
import { NoKeplrAccountModal } from './NoKeplrAccountModal'

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <DAppProvider>
    <AppLayoutInner>{children}</AppLayoutInner>
  </DAppProvider>
)

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
  // DAO creation modal that persists when navigating from create page to DAO
  // page.
  const { isPinned, setPinned, setUnpinned } = usePinnedDaos()
  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )
  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

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
    }),
    [
      responsiveNavigationEnabled,
      responsiveRightSidebarEnabled,
      updateProfileNftVisible,
    ]
  )

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

  // TODO(v2): Add real data back in when pools indexer works.
  // //! Token prices
  // // Updates once per minute, so token price will also update once per minute.
  // const currentBlockHeightLoadable = useCachedLoadable(blockHeightSelector)
  // const blocksPerYearLoadable = useCachedLoadable(blocksPerYearSelector)
  // // Current native pool data and snapshot from ~24 hours ago.
  // const nativeUsdcPoolAndSnapshotQuery = usePoolAndSnapshotAtBlockHeight({
  //   swapContractAddress: USDC_SWAP_ADDRESS,
  //   blockHeight:
  //     currentBlockHeightLoadable.state !== 'hasValue' ||
  //     blocksPerYearLoadable.state !== 'hasValue'
  //       ? 0
  //       : currentBlockHeightLoadable.contents -
  //         convertSecondsToBlocks(blocksPerYearLoadable.contents, 24 * 3600),
  // })
  // const nativeUsdcPoolAndSnapshot =
  //   nativeUsdcPoolAndSnapshotQuery.data ??
  //   nativeUsdcPoolAndSnapshotQuery.previousData

  // const currentNativePrice = nativeUsdcPoolAndSnapshot
  //   ? Number(
  //       Number(nativeUsdcPoolAndSnapshot.current.token2Amount) /
  //         Number(nativeUsdcPoolAndSnapshot.current.token1Amount)
  //     )
  //   : undefined
  // const yesterdayNativePrice =
  //   nativeUsdcPoolAndSnapshot?.snapshots.nodes.length === 1
  //     ? Number(
  //         Number(nativeUsdcPoolAndSnapshot.snapshots.nodes[0].token2Amount) /
  //           Number(nativeUsdcPoolAndSnapshot.snapshots.nodes[0].token1Amount)
  //       )
  //     : undefined

  //! Pinned DAOs
  const pinnedDaoDropdownInfosLoadable = useCachedLoadable(
    pinnedDaoDropdownInfosSelector
  )

  //! Loadable errors.
  useEffect(() => {
    if (pinnedDaoDropdownInfosLoadable.state === 'hasError') {
      console.error(pinnedDaoDropdownInfosLoadable.contents)
    }
  }, [
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
          }}
          modalProps={{
            onClose: () => setDaoCreatedCardProps(undefined),
          }}
          subDao={!!daoCreatedCardProps.parentDao}
        />
      )}

      {proposalCreatedCardProps && (
        <ProposalCreatedModal
          itemProps={proposalCreatedCardProps}
          modalProps={{
            onClose: () => setProposalCreatedCardProps(undefined),
          }}
        />
      )}

      <StatelessAppLayout
        context={appLayoutContext}
        navigationProps={{
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
          // TODO(v2): Add real data back in when pools indexer works.
          tokenPrices: {
            loading: false,
            data: [],
          },
          // currentNativePrice === undefined
          //   ? { loading: true }
          //   : {
          //       loading: false,
          //       data: [
          //         {
          //           label: nativeTokenLabel(NATIVE_DENOM),
          //           price: Number(
          //             currentNativePrice.toLocaleString(undefined, {
          //               maximumFractionDigits: 3,
          //             })
          //           ),
          //           priceDenom: 'USDC',
          //           change:
          //             yesterdayNativePrice !== undefined
          //               ? ((currentNativePrice - yesterdayNativePrice) /
          //                   yesterdayNativePrice) *
          //                 100
          //               : undefined,
          //         },
          //       ],
          //     },
          version: '2.0',
          pinnedDaos: mountedInBrowser
            ? loadableToLoadingData(pinnedDaoDropdownInfosLoadable, [])
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
