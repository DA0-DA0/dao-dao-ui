import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types'

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

  if (document.readyState === 'complete') {
    if (keplr) {
      return keplr
    } else {
      throw new Error('Keplr not found')
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        const keplr = (window as KeplrWindow).keplr
        if (keplr) {
          resolve(keplr)
        } else {
          reject(new Error('Keplr not found'))
        }
        document.removeEventListener('readystatechange', documentStateChange)
      }
    }

    document.addEventListener('readystatechange', documentStateChange)
  })
}
