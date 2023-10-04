import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import {
  betaWarningAcceptedAtom,
  commandModalVisibleAtom,
  govProposalCreatedCardPropsAtom,
  mountedInBrowserAtom,
  navigationCompactAtom,
  proposalCreatedCardPropsAtom,
  refreshBlockHeightAtom,
  refreshTokenUsdcPriceAtom,
  walletChainIdAtom,
} from '@dao-dao/state'
import {
  BetaWarningModal,
  ChainProvider,
  GovProposalCreatedModal,
  ProposalCreatedModal,
  DappLayout as StatelessDappLayout,
  useAppContext,
  useCachedLoading,
  usePlatform,
} from '@dao-dao/stateless'
import { DEFAULT_CHAIN_ID, getSupportedChains } from '@dao-dao/utils'

import { CommandModal } from '../command'
import { useWallet, useWalletInfo } from '../hooks'
import {
  daoCreatedCardPropsAtom,
  followingDaoDropdownInfosSelector,
} from '../recoil'
import { ConnectWallet } from './ConnectWallet'
import { DaoCreatedModal } from './DaoCreatedModal'
import { LinkWrapper } from './LinkWrapper'
import { MigrateFollowingModal } from './MigrateFollowingModal'
import { SidebarWallet } from './SidebarWallet'
import { WalletModals } from './wallet'

export const DappLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  const walletChainId = useRecoilValue(walletChainIdAtom)
  // Prevent hydration mismatch error by loading chain ID from local storage
  // after mounting.
  const chainId = mountedInBrowser ? walletChainId : DEFAULT_CHAIN_ID

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
  const [govProposalCreatedCardProps, setGovProposalCreatedCardProps] =
    useRecoilState(govProposalCreatedCardPropsAtom)

  const { rootCommandContextMaker, inbox } = useAppContext()
  // Type-check, should always be loaded for dapp.
  if (!inbox) {
    throw new Error(t('error.loadingData'))
  }

  const { connect, isWalletConnected } = useWallet()
  const { walletHexPublicKey, walletProfileData } = useWalletInfo()

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

  //! Refresh every minute. Block height, USDC conversions, and wallet balances.
  const setRefreshBlockHeight = useSetRecoilState(refreshBlockHeightAtom)
  const setRefreshUsdcPrices = useSetRecoilState(refreshTokenUsdcPriceAtom(''))
  // Refresh block height and wallet balances every minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshBlockHeight((id) => id + 1)
      setRefreshUsdcPrices((id) => id + 1)
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [setRefreshBlockHeight, setRefreshUsdcPrices])

  //! Following DAOs
  const followingDaoDropdownInfos = useCachedLoading(
    walletHexPublicKey
      ? waitForAll(
          getSupportedChains().map(({ chain }) =>
            followingDaoDropdownInfosSelector({
              chainId: chain.chain_id,
              walletPublicKey: walletHexPublicKey,
            })
          )
        )
      : undefined,
    []
  )

  return (
    // Default wrap Dapp in chain provider. Used in DappNavigation for default
    // governance tab.
    <ChainProvider chainId={chainId}>
      <StatelessDappLayout
        connect={connect}
        connectWalletButton={<ConnectWallet variant="secondary" />}
        connected={isWalletConnected}
        navigationProps={{
          walletConnected: isWalletConnected,
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
                  data: inbox.items.length,
                },
          setCommandModalVisible: () => setCommandModalVisible(true),
          version: '2.0',
          followingDaos: mountedInBrowser
            ? followingDaoDropdownInfos.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: followingDaoDropdownInfos.data
                    .flat()
                    // Alphabetize.
                    .sort((a, b) => a.name.localeCompare(b.name)),
                }
            : // Prevent hydration errors by loading until mounted.
              { loading: true },
          compact,
          setCompact,
          mountedInBrowser,
        }}
        rightSidebarProps={{
          wallet: <SidebarWallet />,
        }}
        walletProfileData={isWalletConnected ? walletProfileData : undefined}
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
        <MigrateFollowingModal />

        {daoCreatedCardProps && (
          <DaoCreatedModal
            itemProps={daoCreatedCardProps}
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

        {govProposalCreatedCardProps && (
          <GovProposalCreatedModal
            itemProps={{
              ...govProposalCreatedCardProps,
              LinkWrapper,
            }}
            modalProps={{
              onClose: () => setGovProposalCreatedCardProps(undefined),
            }}
          />
        )}

        <WalletModals />
      </StatelessDappLayout>
    </ChainProvider>
  )
}
