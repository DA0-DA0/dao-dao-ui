import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  betaWarningAcceptedAtom,
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
  SdaLayout as StatelessSdaLayout,
} from '@dao-dao/stateless'
import { DaoPageMode, IAppLayoutContext } from '@dao-dao/types'

import { useDaoTabs, useWalletInfo } from '../hooks'
import { daoCreatedCardPropsAtom } from '../recoil/atoms/newDao'
import { ConnectWallet } from './ConnectWallet'
import { SdaDaoHome } from './dao'
import { IconButtonLink } from './IconButtonLink'
import { LinkWrapper } from './LinkWrapper'
import { PfpkNftSelectionModal } from './PfpkNftSelectionModal'
import { SidebarWallet } from './SidebarWallet'

export const SdaLayout = ({ children }: { children: ReactNode }) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [noKeplrAccount, setNoKeplrAccount] = useRecoilState(noKeplrAccountAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [compact, setCompact] = useRecoilState(navigationCompactAtom)
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
      mode: DaoPageMode.Sda,
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
      setRootCommandContextMaker: () => {},
      inbox: {
        loading: false,
        refreshing: false,
        daosWithItems: [],
        itemCount: 0,
        refresh: () => {},
      },
    }),
    [
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

  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )

  const tabs = useDaoTabs({ includeHome: SdaDaoHome })

  return (
    <StatelessSdaLayout
      connect={connect}
      connectWalletButton={<ConnectWallet variant="secondary" />}
      connected={connected}
      context={appLayoutContext}
      navigationProps={{
        tabs,
        LinkWrapper,
        version: '2.0',
        compact,
        setCompact,
        mountedInBrowser,
      }}
      rightSidebarProps={{
        wallet: <SidebarWallet />,
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
              hide: true,
            },
            LinkWrapper,
            IconButtonLink,
          }}
          modalProps={{
            onClose: () => setDaoCreatedCardProps(undefined),
          }}
          subDao={!!daoCreatedCardProps}
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
    </StatelessSdaLayout>
  )
}
