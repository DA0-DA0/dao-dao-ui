import { useChain } from '@cosmos-kit/react-lite'
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

  const chainWallet = useChain(currentChainName || firstSupportedChainName)
  const { connect, disconnect, isWalletConnecting } = chainWallet

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
