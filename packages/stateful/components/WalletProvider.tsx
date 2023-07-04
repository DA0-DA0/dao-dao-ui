import { Chain } from '@chain-registry/types'
import { GasPrice } from '@cosmjs/stargate'
import { SignerOptions } from '@cosmos-kit/core'
import { wallets as keplrExtensionWallets } from '@cosmos-kit/keplr-extension'
import { wallets as keplrMobileWallets } from '@cosmos-kit/keplr-mobile'
import { ChainProvider } from '@cosmos-kit/react-lite'
import { ChainInfo } from '@keplr-wallet/types'
import { PromptSign } from '@noahsaso/cosmodal/dist/wallets/web3auth/types'
import { assets, chains } from 'chain-registry'
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
import { ChainId, Web3AuthPrompt } from '@dao-dao/types'
import {
  CHAIN_ID,
  CHAIN_REST_ENDPOINT,
  CHAIN_RPC_ENDPOINT,
  MAINNET,
  SITE_URL,
  STARGAZE_REST_ENDPOINT,
  STARGAZE_RPC_ENDPOINT,
  WC_ICON_PATH,
  WEB3AUTH_CLIENT_ID,
  getNativeTokenForChainId,
  maybeGetKeplrChainInfo,
  typesRegistry,
} from '@dao-dao/utils'

import { useWallet } from '../hooks/useWallet'
import { WalletUi } from './wallet'

const currentChainInfo: ChainInfo | undefined = maybeGetKeplrChainInfo(CHAIN_ID)
// Fail build if chain info not found.
if (!currentChainInfo) {
  throw new Error(`Chain info not found for CHAIN_ID: ${CHAIN_ID}`)
}

const stargazeMainnetChainInfo: ChainInfo | undefined = maybeGetKeplrChainInfo(
  ChainId.StargazeMainnet
)
// Fail build if chain info not found.
if (!stargazeMainnetChainInfo) {
  throw new Error('Stargaze mainnet chain info not found')
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

  const getSignerOptions = ({ chain_id, fees }: Chain) => {
    let gasPrice
    try {
      const nativeToken = getNativeTokenForChainId(chain_id)
      const feeToken = fees?.fee_tokens.find(
        ({ denom }) => denom === nativeToken.denomOrAddress
      )
      const gasPriceAmount =
        feeToken?.average_gas_price ??
        feeToken?.high_gas_price ??
        feeToken?.low_gas_price ??
        feeToken?.fixed_min_gas_price

      gasPrice =
        feeToken && feeToken.denom.length >= 3 && gasPriceAmount !== undefined
          ? GasPrice.fromString(gasPriceAmount + feeToken.denom)
          : undefined
    } catch {}

    return {
      gasPrice,
      registry: typesRegistry,
    }
  }

  const signerOptions: SignerOptions = {
    signingStargate: getSignerOptions,
    signingCosmwasm: getSignerOptions,
  }

  return (
    <ChainProvider
      assetLists={assets}
      chains={chains}
      endpointOptions={{
        endpoints: {
          // Use environment variables to determine RPC/REST nodes.
          [currentChainInfo.chainName]: {
            rpc: [CHAIN_RPC_ENDPOINT],
            rest: [CHAIN_REST_ENDPOINT],
          },
          [stargazeMainnetChainInfo.chainName]: {
            rpc: [STARGAZE_RPC_ENDPOINT],
            rest: [STARGAZE_REST_ENDPOINT],
          },
        },
      }}
      signerOptions={signerOptions}
      walletConnectOptions={{
        signClient: {
          projectId: '',
          relayUrl: 'wss://relay.walletconnect.org',
          metadata: {
            name: t('meta.title'),
            description: t('meta.description'),
            url: SITE_URL,
            icons: [
              (typeof window === 'undefined'
                ? SITE_URL
                : window.location.origin) + WC_ICON_PATH,
            ],
          },
        },
      }}
      walletModal={WalletUi}
      wallets={[
        ...keplrExtensionWallets,
        // TODO: Add all the other wallets.
        // Only allow Keplr Mobile on mainnet since it can't use testnet.
        ...(MAINNET ? keplrMobileWallets : []),
        // TODO: Add web3auth (Google, Apple, Discord, Twitter).
      ]}
    >
      <InnerWalletProvider>{children}</InnerWalletProvider>
    </ChainProvider>
  )
}

const InnerWalletProvider = ({ children }: PropsWithChildren<{}>) => {
  const setSigningCosmWasmClient = useSetRecoilState(signingCosmWasmClientAtom)
  const { getSigningCosmWasmClient, address, isWalletConnected } = useWallet()

  // Save address and client in recoil atom so it can be used by selectors.
  useEffect(() => {
    if (!isWalletConnected) {
      setSigningCosmWasmClient(undefined)
      return
    }

    ;(async () => {
      const signingCosmWasmClient = await getSigningCosmWasmClient()
      setSigningCosmWasmClient(signingCosmWasmClient)
    })()
  }, [
    setSigningCosmWasmClient,
    address,
    isWalletConnected,
    getSigningCosmWasmClient,
  ])

  return <>{children}</>
}
