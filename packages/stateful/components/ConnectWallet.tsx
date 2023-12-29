import { useChain, useManager } from '@cosmos-kit/react-lite'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state'
import {
  ConnectWalletProps,
  ConnectWallet as StatelessConnectWallet,
  Tooltip,
  useChainContextIfAvailable,
} from '@dao-dao/stateless'
import { getSupportedChains, maybeGetChainForChainId } from '@dao-dao/utils'

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
  const chainName = currentChainName || firstSupportedChainName

  const { getWalletRepo } = useManager()

  // Chain of main wallet connection.
  const mainWalletChainId = useRecoilValue(walletChainIdAtom)
  // Get main wallet connection.
  const mainWallet = getWalletRepo(
    maybeGetChainForChainId(mainWalletChainId)?.chain_name || chainName
  )?.current

  const {
    walletRepo,
    disconnect,
    isWalletConnecting,
    chain: connectingToChain,
  } = useChain(chainName)

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
            : // If connecting to a chain other than the main wallet connection,
              // auto-select the main wallet if it exists. Otherwise, allow
              // wallet modal to show up by passing undefined to
              // walletRepo.connect.
              walletRepo.connect(
                connectingToChain.chain_id !== mainWalletChainId &&
                  mainWallet?.isWalletConnected
                  ? mainWallet.walletName
                  : undefined
              )
        }
        variant="primary"
        {...props}
      />
    </Tooltip>
  )
}
