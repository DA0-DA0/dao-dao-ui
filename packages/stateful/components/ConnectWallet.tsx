import { useChains } from '@cosmos-kit/react-lite'
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
  const chainNames = getSupportedChains().map(({ chain }) => chain.chain_name)
  const chainWallets = useChains(chainNames)
  const { connect, disconnect, isWalletConnecting } =
    chainWallets[
      // Use current chain if available, or just use first chain. Should not
      // matter because connect/disconnect will sync to all chains, but in case
      // the user only approves some chains and not others, we want to make sure
      // the current chain is priority.
      currentChainName || chainNames[0]
    ] ||
    // In case current chain is not supported, fallback to first chain.
    chainWallets[Object.keys(chainWallets)[0]]

  return (
    <Tooltip
      title={isWalletConnecting ? t('button.stopConnecting') : undefined}
    >
      <StatelessConnectWallet
        allowClickWhileLoading
        loading={isWalletConnecting}
        onConnect={isWalletConnecting ? disconnect : connect}
        variant="primary"
        {...props}
      />
    </Tooltip>
  )
}
