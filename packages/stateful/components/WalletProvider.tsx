import { GasPrice } from '@cosmjs/stargate'
import { Bech32Address } from '@keplr-wallet/cosmos'
import { ChainInfo, FeeCurrency } from '@keplr-wallet/types'
import {
  ChainInfoID,
  ChainInfoMap,
  WalletManagerProvider,
  WalletType,
  useWallet,
} from '@noahsaso/cosmodal'
import { PromptSign } from '@noahsaso/cosmodal/dist/wallets/web3auth/types'
import { isMobile } from '@walletconnect/browser-utils'
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { signingCosmWasmClientAtom } from '@dao-dao/state'
import { Web3AuthPrompt } from '@dao-dao/types'
import {
  CHAIN_ID,
  CHAIN_REST_ENDPOINT,
  CHAIN_RPC_ENDPOINT,
  MAINNET,
  SITE_URL,
  STARGAZE_REST_ENDPOINT,
  STARGAZE_RPC_ENDPOINT,
  STARGAZE_TESTNET_CHAIN_ID,
  STARGAZE_TESTNET_REST_ENDPOINT,
  STARGAZE_TESTNET_RPC_ENDPOINT,
  WC_ICON_PATH,
  WEB3AUTH_CLIENT_ID,
  getChainForChainId,
  getTokenForChainIdAndDenom,
  maybeGetChainForChainId,
  typesRegistry,
} from '@dao-dao/utils'

let currentChainInfo: ChainInfo | undefined
// Get chain from cosmodal chain infos, falling back to chain-registry.
if ((Object.values(ChainInfoID) as string[]).includes(CHAIN_ID)) {
  currentChainInfo = ChainInfoMap[CHAIN_ID as ChainInfoID]
} else {
  const chain = maybeGetChainForChainId(CHAIN_ID)
  if (chain) {
    const stakeCurrency = getTokenForChainIdAndDenom(
      chain.chain_id,
      chain.staking?.staking_tokens[0].denom!,
      false
    )
    const feeCurrencies =
      chain.fees?.fee_tokens?.map(
        ({
          denom,
          low_gas_price,
          average_gas_price,
          high_gas_price,
        }): FeeCurrency => {
          const token = getTokenForChainIdAndDenom(chain.chain_id, denom, false)

          return {
            coinDenom: token.symbol,
            coinMinimalDenom: token.denomOrAddress,
            coinDecimals: token.decimals,
            gasPriceStep:
              low_gas_price !== undefined &&
              average_gas_price !== undefined &&
              high_gas_price !== undefined
                ? {
                    low: low_gas_price,
                    average: average_gas_price,
                    high: high_gas_price,
                  }
                : undefined,
          }
        }
      ) ?? []

    currentChainInfo = {
      rpc: CHAIN_RPC_ENDPOINT,
      rest: CHAIN_REST_ENDPOINT,
      chainId: chain.chain_id,
      chainName: chain.pretty_name || chain.chain_name,
      stakeCurrency: {
        coinDenom: stakeCurrency.symbol,
        coinMinimalDenom: stakeCurrency.denomOrAddress,
        coinDecimals: stakeCurrency.decimals,
      },
      bip44: {
        coinType: chain.slip44,
      },
      alternativeBIP44s: chain.alternative_slip44s?.map((coinType) => ({
        coinType,
      })),
      bech32Config: Bech32Address.defaultBech32Config(chain.bech32_prefix),
      currencies: feeCurrencies,
      feeCurrencies,
    }
  }
}
// Fail build if chain info not found.
if (!currentChainInfo) {
  throw new Error(`Chain info not found for CHAIN_ID: ${CHAIN_ID}`)
}

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

  return (
    <WalletManagerProvider
      chainInfoOverrides={[
        // Use environment variables to determine RPC/REST nodes.
        {
          // Typechecked above.
          ...currentChainInfo!,
          rpc: CHAIN_RPC_ENDPOINT,
          rest: CHAIN_REST_ENDPOINT,
        },
        {
          ...ChainInfoMap[ChainInfoID.Stargaze1],
          rpc: STARGAZE_RPC_ENDPOINT,
          rest: STARGAZE_REST_ENDPOINT,
        },
        // Stargaze testnet.
        {
          ...ChainInfoMap[ChainInfoID.Stargaze1],
          chainId: STARGAZE_TESTNET_CHAIN_ID,
          chainName: 'Stargaze Testnet',
          rpc: STARGAZE_TESTNET_RPC_ENDPOINT,
          rest: STARGAZE_TESTNET_REST_ENDPOINT,
        },
      ]}
      defaultChainId={CHAIN_ID}
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
  const setSigningCosmWasmClient = useSetRecoilState(signingCosmWasmClientAtom)
  const { signingCosmWasmClient, address } = useWallet()

  // Save address and client in recoil atom so it can be used by selectors.
  useEffect(() => {
    setSigningCosmWasmClient(signingCosmWasmClient)
  }, [setSigningCosmWasmClient, signingCosmWasmClient, address])

  return <>{children}</>
}
