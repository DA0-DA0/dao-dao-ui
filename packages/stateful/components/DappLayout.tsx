import { useQueries } from '@tanstack/react-query'
import uniqBy from 'lodash.uniqby'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  daoQueries,
  mountedInBrowserAtom,
  navigationCompactAtom,
  proposalCreatedCardPropsAtom,
  walletChainIdAtom,
} from '@dao-dao/state'
import {
  BetaWarningModal,
  ChainProvider,
  ProposalCreatedModal,
  DappLayout as StatelessDappLayout,
  useAppContext,
  usePlatform,
} from '@dao-dao/stateless'
import {
  getSupportedChains,
  keepSubDaosInDropdown,
  makeCombineQueryResultsIntoLoadingDataWithError,
  maybeGetChainForChainId,
  serializeDaoSource,
  subDaoExistsInDropdown,
} from '@dao-dao/utils'

import { CommandModal } from '../command'
import { useAutoRefreshData, useFollowingDaos, useWallet } from '../hooks'
import { daoCreatedCardPropsAtom } from '../recoil'
import { ButtonLink } from './ButtonLink'
import { DaoCreatedModal } from './DaoCreatedModal'
import { LinkWrapper } from './LinkWrapper'
import { DockWallet } from './NavWallet'
import { StatefulPageHeader } from './PageHeader'
import { WalletModals } from './wallet'

export const DappLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  const walletChainId = useRecoilValue(walletChainIdAtom)
  // Prevent hydration mismatch error by loading chain ID from local storage
  // after mounting.
  let chainId = mountedInBrowser
    ? walletChainId
    : getSupportedChains()[0].chainId
  // Fallback to default if chain ID invalid.
  if (!maybeGetChainForChainId(chainId)) {
    chainId = getSupportedChains()[0].chainId
  }

  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [commandModalVisible, setCommandModalVisible] = useRecoilState(
    commandModalVisibleAtom
  )
  const [compact, setCompact] = useRecoilState(navigationCompactAtom)
  // DAO creation modal that persists when navigating from create page to DAO
  // page.
  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )
  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

  const { rootCommandContextMaker, inbox } = useAppContext()
  // Type-check, should always be loaded for dapp.
  if (!inbox) {
    throw new Error(t('error.loadingData'))
  }

  const { openView, isWalletConnected } = useWallet()

  //! COMMAND MODAL
  // Hide modal when we nav away.
  useEffect(() => {
    setCommandModalVisible(false)
  }, [router.asPath, setCommandModalVisible])
  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()
  // Handle keypress to show command modal or not.
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
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
  // Inbox notifications
  const [lastInboxCount, setLastInboxCount] = useState(inbox.items.length)
  useEffect(() => {
    if (inbox.items.length > lastInboxCount) {
      setTimeout(
        () =>
          toast.success(
            t('info.notificationsInInbox', {
              count: inbox.items.length,
            })
          ),
        // 3 second delay.
        3 * 1000
      )
    }
    setLastInboxCount(inbox.items.length)
  }, [inbox.items.length, lastInboxCount, t])

  //! Auto refresh various data used across the UI
  useAutoRefreshData()

  //! Following DAOs
  const { following } = useFollowingDaos()
  const followingDaoDropdownInfos = useQueries({
    queries:
      following.loading || following.errored
        ? []
        : following.data.map(({ chainId, coreAddress }) =>
            daoQueries.daoDropdownInfo({
              chainId,
              coreAddress,
            })
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      // Load if DAOs are loading, but return none if errored.
      loadIfNone: following.loading,
      firstLoad: 'one',
      errorIf: 'all',
      transform: (infos) =>
        // Remove SubDAOs that are not being followed.
        keepSubDaosInDropdown(
          // Keep top-level DAOs only if they are not SubDAOs elsewhere. This
          // ensures that a SubDAO is not shown multiple times. If both a parent
          // DAO and SubDAO are followed, the SubDAO will only appear in the
          // parent's dropdown. If the parent isn't followed, the SubDAO will
          // appear in the top level.
          !compact
            ? infos.filter(
                ({ coreAddress }) => !subDaoExistsInDropdown(infos, coreAddress)
              )
            : infos,
          infos
        ),
    }),
  })

  return (
    // Default wrap Dapp in chain provider. Used in DappNavigation for default
    // governance tab.
    <ChainProvider chainId={chainId}>
      <StatelessDappLayout
        ButtonLink={ButtonLink}
        DockWallet={DockWallet}
        PageHeader={StatefulPageHeader}
        connect={openView}
        inboxCount={
          inbox.loading ||
          // Prevent hydration errors by loading until mounted.
          !mountedInBrowser
            ? {
                loading: true,
              }
            : {
                loading: false,
                data: inbox.items.length,
              }
        }
        navigationProps={{
          walletConnected: isWalletConnected,
          LinkWrapper,
          setCommandModalVisible: () => setCommandModalVisible(true),
          followingDaos: mountedInBrowser
            ? followingDaoDropdownInfos.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: followingDaoDropdownInfos.errored
                    ? []
                    : uniqBy(followingDaoDropdownInfos.data, (d) =>
                        serializeDaoSource(d)
                      )
                        // Alphabetize.
                        .sort((a, b) => a.name.localeCompare(b.name)),
                }
            : // Prevent hydration errors by loading until mounted.
              { loading: true },
          compact,
          setCompact,
          mountedInBrowser,
        }}
      >
        {children}

        {/* Modals */}

        <BetaWarningModal
          onClose={() => setBetaWarningAccepted(true)}
          visible={mountedInBrowser && !betaWarningAccepted}
        />
        {rootCommandContextMaker && (
          <CommandModal
            makeRootContext={rootCommandContextMaker}
            setVisible={setCommandModalVisible}
            visible={commandModalVisible}
          />
        )}

        {daoCreatedCardProps && (
          <DaoCreatedModal
            itemProps={daoCreatedCardProps}
            modalProps={{
              onClose: () => setDaoCreatedCardProps(undefined),
            }}
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

        <WalletModals />
      </StatelessDappLayout>
    </ChainProvider>
  )
}
