import { GasPrice } from '@cosmjs/stargate'
import {
  ChainInfoOverrides,
  WalletManagerProvider,
  WalletType,
} from '@noahsaso/cosmodal'
import { PromptSign } from '@noahsaso/cosmodal/dist/wallets/web3auth/types'
import { isMobile } from '@walletconnect/browser-utils'
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state'
import { Web3AuthPrompt } from '@dao-dao/types'
import {
  CHAIN_ENDPOINTS,
  MAINNET,
  SITE_URL,
  WC_ICON_PATH,
  WEB3AUTH_CLIENT_ID,
  getChainForChainId,
  maybeGetKeplrChainInfo,
  typesRegistry,
} from '@dao-dao/utils'

import { useSyncWalletSigner } from '../hooks'

export type WalletProviderProps = {
  // This needs to be provided by the parent component and then passed to the
  // AppContext that wraps the app. Since the AppContext uses the inbox which
  // depends on the wallet, we need to pass the setter to the wallet provider so
  // that the value can be passed to the AppContext, used by the
  // Web3AuthPromptModal in the respective app layout (DappLayout or SdaLayout).
  setWeb3AuthPrompt: Dispatch<SetStateAction<Web3AuthPrompt | undefined>>
  children: ReactNode
}

export const WalletProvider = ({
  setWeb3AuthPrompt,
  children,
}: WalletProviderProps) => {
  const { t } = useTranslation()
  const defaultChainId = useRecoilValue(walletChainIdAtom)

  const web3AuthWalletOptions = Object.freeze({
    client: {
      clientId: WEB3AUTH_CLIENT_ID,
      web3AuthNetwork: MAINNET ? 'cyan' : 'testnet',
    },
    promptSign: (...params: Parameters<PromptSign>): Promise<boolean> =>
      new Promise((resolve) =>
        setWeb3AuthPrompt({
          signData: params[1],
          resolve: (approved) => {
            setWeb3AuthPrompt(undefined)
            resolve(approved)
          },
        })
      ),
  })

  // Load all custom chain endpoints into wallet provider.
  const chainInfoOverrides: ChainInfoOverrides = Object.entries(
    CHAIN_ENDPOINTS
  ).map(([chainId, { rpc, rest }]) => {
    const chainInfo = maybeGetKeplrChainInfo(chainId)
    if (!chainInfo) {
      throw new Error(`Chain info not found for chain ID: ${chainId}`)
    }

    return {
      ...chainInfo,
      rpc,
      rest,
    }
  })

  return (
    <WalletManagerProvider
      chainInfoOverrides={chainInfoOverrides}
      defaultChainId={defaultChainId}
      disableDefaultUi
      enabledWalletTypes={[
        // Only show extension wallets on desktop.
        ...(!isMobile() ? [WalletType.Keplr, WalletType.Leap] : []),
        // Only allow Keplr Mobile on mainnet since it can't use testnet.
        ...(MAINNET ? [WalletType.KeplrMobile] : []),
        // Web3Auth social logins.
        WalletType.Google,
        WalletType.Apple,
        WalletType.Discord,
        WalletType.Twitter,
      ]}
      getSigningCosmWasmClientOptions={(chainInfo) => {
        const feeToken = getChainForChainId(chainInfo.chainId).fees
          ?.fee_tokens?.[0]
        const gasPrice =
          feeToken?.average_gas_price ??
          feeToken?.high_gas_price ??
          feeToken?.low_gas_price
        if (!feeToken || gasPrice === undefined) {
          throw new Error(`No fee token found for chain ${chainInfo.chainId}`)
        }

        return {
          gasPrice: GasPrice.fromString(gasPrice + feeToken.denom),
          registry: typesRegistry,
        }
      }}
      getSigningStargateClientOptions={(chainInfo) => {
        const feeToken = getChainForChainId(chainInfo.chainId).fees
          ?.fee_tokens?.[0]
        const gasPrice =
          feeToken?.average_gas_price ??
          feeToken?.high_gas_price ??
          feeToken?.low_gas_price
        if (!feeToken || gasPrice === undefined) {
          throw new Error(`No fee token found for chain ${chainInfo.chainId}`)
        }

        return {
          gasPrice: GasPrice.fromString(gasPrice + feeToken.denom),
          registry: typesRegistry,
        }
      }}
      localStorageKey="connectedWalletId"
      walletConnectClientMeta={{
        name: t('meta.title'),
        description: t('meta.description'),
        url: SITE_URL,
        icons: [
          (typeof window === 'undefined' ? SITE_URL : window.location.origin) +
            WC_ICON_PATH,
        ],
      }}
      walletOptions={{
        [WalletType.Google]: web3AuthWalletOptions,
        [WalletType.Apple]: web3AuthWalletOptions,
        [WalletType.Discord]: web3AuthWalletOptions,
        [WalletType.Twitter]: web3AuthWalletOptions,
      }}
    >
      <InnerWalletProvider>{children}</InnerWalletProvider>
    </WalletManagerProvider>
  )
}

const InnerWalletProvider = ({ children }: PropsWithChildren<{}>) => {
  useSyncWalletSigner()

  return <>{children}</>
}
