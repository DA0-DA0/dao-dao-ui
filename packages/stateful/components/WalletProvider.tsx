import { Chain } from '@chain-registry/types'
import { GasPrice } from '@cosmjs/stargate'
import { Endpoints, SignerOptions } from '@cosmos-kit/core'
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation'
import { wallets as keplrExtensionWallets } from '@cosmos-kit/keplr-extension'
import { wallets as keplrMobileWallets } from '@cosmos-kit/keplr-mobile'
import { wallets as leapWallets } from '@cosmos-kit/leap'
import { ChainProvider, walletContext } from '@cosmos-kit/react-lite'
import { wallets as stationWallets } from '@cosmos-kit/station'
import { wallets as trustWallets } from '@cosmos-kit/trust'
import { wallets as vectisWallets } from '@cosmos-kit/vectis'
import { PromptSign, makeWeb3AuthWallets } from '@cosmos-kit/web3auth'
import { assets, chains } from 'chain-registry'
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { mountedInBrowserAtom } from '@dao-dao/state/recoil'
import { Web3AuthPrompt } from '@dao-dao/types'
import {
  CHAIN_ENDPOINTS,
  MAINNET,
  SITE_URL,
  WEB3AUTH_CLIENT_ID,
  getChainForChainId,
  getNativeTokenForChainId,
  maybeGetKeplrChainInfo,
  typesRegistry,
} from '@dao-dao/utils'

import { useSyncWalletSigner, useWallet } from '../hooks'
import { WalletUi } from './wallet'

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

  // Google, Apple, Discord, Twitter
  const web3AuthWallets = useMemo(
    () =>
      makeWeb3AuthWallets({
        loginMethods: [
          {
            provider: 'google',
            name: 'Google',
            logo: 'https://bafkreihcbb7vqxb3ee52kn5fnsf4rzqtjru5n6q2k4ungbw7k3ljpnhhvm.ipfs.nftstorage.link/',
          },
          {
            provider: 'apple',
            name: 'Apple',
            logo: 'https://bafkreih5fbwcnzq4xmarrgcf5wkr5mpx5gfia2loj5fruaa542v7kwv5iq.ipfs.nftstorage.link/',
          },
          {
            provider: 'discord',
            name: 'Discord',
            logo: 'https://bafkreifssoo7ljepiix4tvrpe4gbqlyhwx6vu6rtir4ou45pj7nv5mjnhm.ipfs.nftstorage.link/',
          },
          {
            provider: 'twitter',
            name: 'Twitter',
            logo: 'https://bafkreibfs3mpmwmaxqakpkpss7pjoe4tl2td3ghxt2mi75pyvrm47qn4jy.ipfs.nftstorage.link/',
          },
        ],
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
      }),
    [setWeb3AuthPrompt]
  )

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
      // cosmos-kit has an older version of the package. This is a workaround.
      gasPrice: gasPrice as any,
      // cosmos-kit has an older version of the package. This is a workaround.
      registry: typesRegistry as any,
    }
  }

  const signerOptions: SignerOptions = {
    // cosmos-kit has an older version of the package. This is a workaround.
    signingStargate: getSignerOptions as SignerOptions['signingStargate'],
    // cosmos-kit has an older version of the package. This is a workaround.
    signingCosmwasm: getSignerOptions as SignerOptions['signingCosmwasm'],
  }

  return (
    <ChainProvider
      assetLists={assets}
      chains={chains}
      endpointOptions={{
        // Disable endpoint validation.
        isLazy: true,
        // Load all custom chain endpoints into wallet provider.
        endpoints: Object.entries(CHAIN_ENDPOINTS).reduce(
          (acc, [chainId, { rpc, rest }]) => {
            const chainInfo = maybeGetKeplrChainInfo(chainId)
            if (!chainInfo) {
              throw new Error(`Chain info not found for chain ID: ${chainId}`)
            }

            return {
              ...acc,
              [getChainForChainId(chainId).chain_name]: {
                rpc: [rpc],
                rest: [rest],
              },
            }
          },
          {} as Record<string, Endpoints>
        ),
      }}
      signerOptions={signerOptions}
      walletConnectOptions={{
        signClient: {
          // https://cloud.walletconnect.com
          projectId: '2021db728d55be8401efaf25f4e534cd',
          relayUrl: 'wss://relay.walletconnect.org',
          metadata: {
            name: t('meta.title'),
            description: t('meta.description'),
            url: SITE_URL,
            icons: ['https://daodao.zone/daodao.png'],
          },
        },
      }}
      walletModal={WalletUi}
      wallets={[
        ...keplrExtensionWallets,
        // Only allow Keplr Mobile on mainnet since it can't use testnet.
        ...(MAINNET ? keplrMobileWallets : []),
        ...leapWallets,
        ...stationWallets,
        ...vectisWallets,
        ...trustWallets,
        ...cosmostationWallets,
        // Google, Apple, Discord, Twitter
        ...web3AuthWallets,
      ]}
    >
      <InnerWalletProvider>{children}</InnerWalletProvider>
    </ChainProvider>
  )
}

const InnerWalletProvider = ({ children }: PropsWithChildren<{}>) => {
  useSyncWalletSigner()

  const { isWalletDisconnected, chain, walletRepo } = useWallet()
  // Re-run account restore logic on wallet chain switch to ensure connected.
  const { walletManager } = useContext(walletContext)
  useEffect(() => {
    if (isWalletDisconnected) {
      // @ts-ignore
      walletManager._restoreAccounts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain.chain_id, walletManager])

  // Auto-connect to Keplr mobile web if in that context.
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const connectingKeplrMobileWebConnectionRef = useRef(false)
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !mountedInBrowser ||
      !isWalletDisconnected ||
      connectingKeplrMobileWebConnectionRef.current
    ) {
      return
    }

    // Only try once at a time.
    connectingKeplrMobileWebConnectionRef.current = true

    // Connect.
    ;(async () => {
      try {
        const keplr = await (
          await import('@keplr-wallet/stores')
        ).getKeplrFromWindow()
        const keplrWallet = walletRepo.wallets.find(
          (wallet) =>
            wallet.walletInfo.name === keplrExtensionWallets[0].walletInfo.name
        )
        if (keplr && keplrWallet && keplr.mode === 'mobile-web') {
          await walletRepo.connect(keplrWallet.walletName)
        }
      } catch (err) {
        console.error('Keplr mobile web connection failed', err)
      } finally {
        connectingKeplrMobileWebConnectionRef.current = false
      }
    })()
  }, [isWalletDisconnected, mountedInBrowser, walletRepo])

  return <>{children}</>
}
