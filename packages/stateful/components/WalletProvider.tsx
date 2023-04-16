import { GasPrice } from '@cosmjs/stargate'
import {
  ChainInfoID,
  ChainInfoMap,
  WalletManagerProvider,
  WalletType,
  useWallet,
} from '@noahsaso/cosmodal'
import {
  PromptSign,
  SignData,
} from '@noahsaso/cosmodal/dist/wallets/web3auth/types'
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { signingCosmWasmClientAtom } from '@dao-dao/state'
import { Loader } from '@dao-dao/stateless'
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
  typesRegistry,
} from '@dao-dao/utils'

import { Web3AuthPromptModal } from './Web3AuthPromptModal'

// Assert environment variable CHAIN_ID is a valid chain.
if (!(Object.values(ChainInfoID) as string[]).includes(CHAIN_ID)) {
  throw new Error(`CHAIN_ID constant (${CHAIN_ID}) is an invalid chain ID.`)
}

export interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { t } = useTranslation()

  const [web3AuthPrompt, setWeb3AuthPrompt] = useState<
    | {
        signData: SignData
        resolve: (value: boolean) => void
      }
    | undefined
  >()

  const web3AuthWalletOptions = {
    clientId: WEB3AUTH_CLIENT_ID,
    web3AuthNetwork: MAINNET ? 'cyan' : 'testnet',
    promptSign: (...params: Parameters<PromptSign>): Promise<boolean> =>
      new Promise((resolve) =>
        setWeb3AuthPrompt({
          signData: params[1],
          resolve: (value) => {
            setWeb3AuthPrompt(undefined)
            resolve(value)
          },
        })
      ),
  }

  return (
    <WalletManagerProvider
      // Use environment variables to determine RPC/REST nodes.
      chainInfoOverrides={[
        {
          // Typechecked above.
          ...ChainInfoMap[CHAIN_ID as ChainInfoID],
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
      classNames={{
        modalOverlay: '!backdrop-brightness-50 !backdrop-filter',
        modalContent:
          '!p-6 !max-w-md !bg-background-base !rounded-lg !border !border-border-secondary !shadow-dp8',
        modalCloseButton:
          '!p-1 !text-icon-tertiary bg-transparent hover:!bg-background-interactive-hover active:!bg-background-interactive-pressed !rounded-full !transition !absolute !top-2 !right-2',
        modalHeader: '!header-text',
        modalSubheader: '!title-text',
        wallet:
          '!rounded-lg !bg-background-secondary !p-4 !shadow-none transition-opacity opacity-100 hover:opacity-80 active:opacity-70',
        walletName: '!primary-text',
        walletDescription: '!caption-text',
        textContent: '!body-text',
      }}
      defaultChainId={CHAIN_ID}
      enabledWalletTypes={[
        WalletType.Keplr,
        WalletType.Leap,
        // Only allow WalletConnect on mainnet.
        ...(MAINNET ? [WalletType.WalletConnectKeplr] : []),
        // Web3Auth social logins.
        WalletType.Google,
        WalletType.Apple,
        WalletType.Discord,
        WalletType.Twitter,
      ]}
      getSigningCosmWasmClientOptions={(chainInfo) => ({
        gasPrice: GasPrice.fromString(
          '0.0025' + chainInfo.feeCurrencies[0].coinMinimalDenom
        ),
        registry: typesRegistry,
      })}
      getSigningStargateClientOptions={(chainInfo) => ({
        gasPrice: GasPrice.fromString(
          '0.0025' + chainInfo.feeCurrencies[0].coinMinimalDenom
        ),
        registry: typesRegistry,
      })}
      localStorageKey="connectedWalletId"
      renderLoader={() => <Loader size={42} />}
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

      <Web3AuthPromptModal {...web3AuthPrompt} />
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
