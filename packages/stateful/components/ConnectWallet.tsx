import { useChain, useManager } from '@cosmos-kit/react-lite'
import { useTranslation } from 'react-i18next'

import {
  ConnectWalletProps,
  ConnectWallet as StatelessConnectWallet,
  Tooltip,
  useChainContextIfAvailable,
} from '@dao-dao/stateless'
import { getSupportedChains } from '@dao-dao/utils'

export type StatefulConnectWalletProps = Omit<
  ConnectWalletProps,
  'loading' | 'onConnect'
>

export const ConnectWallet = (props: StatefulConnectWalletProps) => {
  const { t } = useTranslation()

  const {
    chain: { chain_name: currentChainName } = { chain_name: undefined },
  } = useChainContextIfAvailable() ?? {}
  const firstSupportedChainName = getSupportedChains()[0].chain.chain_name

  const { walletRepos } = useManager()
  const { walletRepo, disconnect, isWalletConnecting, wallet } = useChain(
    currentChainName || firstSupportedChainName
  )

  // Get currently connected wallet and connect to it by default if it exists.
  const connectedWallet = walletRepos.find(
    (repo) => repo.current?.isWalletConnected
  )?.current?.walletInfo

  return (
    <Tooltip
      title={isWalletConnecting ? t('button.stopConnecting') : undefined}
    >
      <StatelessConnectWallet
        allowClickWhileLoading
        loading={isWalletConnecting}
        onConnect={() =>
          isWalletConnecting
            ? disconnect()
            : walletRepo.connect((connectedWallet || wallet)?.name)
        }
        variant="primary"
        {...props}
      />
    </Tooltip>
  )
}
