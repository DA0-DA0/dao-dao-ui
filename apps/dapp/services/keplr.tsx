import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types'

import { convertFromMicroDenom } from '@dao-dao/utils'

declare global {
  interface Window extends KeplrWindow {}
}

export function isKeplrInstalled() {
  if (typeof window === 'undefined') {
    return false
  }
  return !!(window.getOfflineSigner || window.keplr)
}

export const connectKeplrWithoutAlerts = async () => {
  // Keplr extension injects the offline signer that is compatible with cosmJS.
  // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
  // And it also injects the helper function to `window.keplr`.
  // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
  const stakingDenom = convertFromMicroDenom(
    process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'
  )

  // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
  // cosmoshub-3 is integrated to Keplr so the code should return without errors.
  // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
  // If the user approves, the chain will be added to the user's Keplr extension.
  // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
  // If the same chain id is already registered, it will resolve and not require the user interactions.
  return await window?.keplr?.experimentalSuggestChain({
    // Chain-id of the Cosmos SDK chain.
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID as string,
    // The name of the chain to be displayed to the user.
    chainName: process.env.NEXT_PUBLIC_CHAIN_NAME as string,
    // RPC endpoint of the chain.
    rpc: process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT as string,
    // REST endpoint of the chain.
    rest: process.env.NEXT_PUBLIC_CHAIN_REST_ENDPOINT as string,
    // Staking coin information
    stakeCurrency: {
      // Coin denomination to be displayed to the user.
      coinDenom: stakingDenom,
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: process.env.NEXT_PUBLIC_STAKING_DENOM as string,
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
    // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
    // The 'stake' button in Keplr extension will link to the webpage.
    // walletUrlForStaking: "",
    // The BIP44 path.
    bip44: {
      // You can only set the coin type of BIP44.
      // 'Purpose' is fixed to 44.
      coinType: 118,
    },
    // Bech32 configuration to show the address to user.
    bech32Config: {
      bech32PrefixAccAddr: process.env
        .NEXT_PUBLIC_CHAIN_BECH32_PREFIX as string,
      bech32PrefixAccPub: `${process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX}pub`,
      bech32PrefixValAddr: `${process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valoper`,
      bech32PrefixValPub: `${process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valoperpub`,
      bech32PrefixConsAddr: `${process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valcons`,
      bech32PrefixConsPub: `${process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valconspub`,
    },
    // List of all coin/tokens used in this chain.
    currencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: stakingDenom,
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: process.env.NEXT_PUBLIC_STAKING_DENOM as string,
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 6,
        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
        // coinGeckoId: ""
      },
    ],
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: stakingDenom,
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: process.env.NEXT_PUBLIC_STAKING_DENOM as string,
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 6,
        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
        // coinGeckoId: ""
      },
    ],
    // (Optional) The number of the coin type.
    // This field is only used to fetch the address from ENS.
    // Ideally, it is recommended to be the same with BIP44 path's coin type.
    // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
    // So, this is separated to support such chains.
    coinType: 118,
    // (Optional) This is used to set the fee of the transaction.
    // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
    // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
    // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
    gasPriceStep: {
      low: 0.03,
      average: 0.04,
      high: 0.05,
    },
  })
}

export const connectKeplr = () => {
  if (!window.getOfflineSigner || !window.keplr) {
    alert('Please install keplr extension')
  } else {
    try {
      connectKeplrWithoutAlerts()
    } catch {
      alert('Failed to suggest the chain')
    }
  }
}

export async function getKeplr(): Promise<Keplr | undefined> {
  if (window.keplr) {
    return window.keplr
  }

  if (document.readyState === 'complete') {
    return window.keplr
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        resolve(window.keplr)
        document.removeEventListener('readystatechange', documentStateChange)
      }
    }

    document.addEventListener('readystatechange', documentStateChange)
  })
}
