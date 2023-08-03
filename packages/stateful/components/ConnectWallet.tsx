import { useTranslation } from 'react-i18next'

import {
  ConnectWalletProps,
  ConnectWallet as StatelessConnectWallet,
  Tooltip,
} from '@dao-dao/stateless'

import { useWallet } from '../hooks/useWallet'

export type StatefulConnectWalletProps = Omit<
  ConnectWalletProps,
  'loading' | 'onConnect'
>

export const ConnectWallet = (props: StatefulConnectWalletProps) => {
  const { t } = useTranslation()
  const { connect, disconnect, isWalletConnecting } = useWallet()

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
