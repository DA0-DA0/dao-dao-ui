import type { Keplr, Window as KeplrWindow } from '@keplr-wallet/types'

declare global {
  interface Window extends KeplrWindow {}
}

// Suggest a token to the user.
export const suggestToken = async (chainId: string, address: string) =>
  (await getKeplrFromWindow())
    ?.suggestToken(chainId, address)
    .then(() => true)
    .catch(() => false)

export const getKeplrFromWindow: () => Promise<
  Keplr | undefined
> = async () => {
  if (typeof window === 'undefined') {
    return
  }

  const keplr = (window as KeplrWindow).keplr

  if (keplr) {
    return keplr
  }

  // Read-only visitors need not have an extension installed. In particular,
  // WalletProvider probes this to detect Keplr mobile web on every page load.
  if (document.readyState === 'complete') {
    return undefined
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        resolve((window as KeplrWindow).keplr)
        document.removeEventListener('readystatechange', documentStateChange)
      }
    }

    document.addEventListener('readystatechange', documentStateChange)
  })
}
