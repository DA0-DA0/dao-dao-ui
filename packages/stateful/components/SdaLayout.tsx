import { ReactNode, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  betaWarningAcceptedAtom,
  mountedInBrowserAtom,
  navigationCompactAtom,
  proposalCreatedCardPropsAtom,
  refreshBlockHeightAtom,
  refreshTokenUsdcPriceAtom,
} from '@dao-dao/state'
import {
  BetaWarningModal,
  DaoCreatedModal,
  PageLoader,
  ProposalCreatedModal,
  SdaLayout as StatelessSdaLayout,
} from '@dao-dao/stateless'

import { useDaoTabs, useWallet, useWalletInfo } from '../hooks'
import { daoCreatedCardPropsAtom } from '../recoil/atoms/newDao'
import { ConnectWallet } from './ConnectWallet'
import { SdaDaoHome } from './dao'
import { IconButtonLink } from './IconButtonLink'
import { LinkWrapper } from './LinkWrapper'
import { SidebarWallet } from './SidebarWallet'
import { SuspenseLoader } from './SuspenseLoader'
import { WalletModals } from './wallet'

export const SdaLayout = ({ children }: { children: ReactNode }) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [compact, setCompact] = useRecoilState(navigationCompactAtom)
  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

  const { connect, isWalletConnected } = useWallet()
  const { walletAddress, walletProfileData } = useWalletInfo()

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
  }, [setRefreshBlockHeight, setRefreshUsdcPrices, walletAddress])

  const [daoCreatedCardProps, setDaoCreatedCardProps] = useRecoilState(
    daoCreatedCardPropsAtom
  )

  const tabs = useDaoTabs({ includeHome: SdaDaoHome })

  return (
    <StatelessSdaLayout
      connect={connect}
      connectWalletButton={<ConnectWallet variant="secondary" />}
      connected={isWalletConnected}
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
      walletProfileData={isWalletConnected ? walletProfileData : undefined}
    >
      <SuspenseLoader fallback={<PageLoader />}>{children}</SuspenseLoader>

      {/* Modals */}

      <BetaWarningModal
        onClose={() => setBetaWarningAccepted(true)}
        visible={mountedInBrowser && !betaWarningAccepted}
      />

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

      <WalletModals />
    </StatelessSdaLayout>
  )
}
