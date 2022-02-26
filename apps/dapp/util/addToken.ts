import { errorNotify, successNotify } from './toast'

export function addToken(address: string) {
  if (typeof window !== 'undefined') {
    ;(window as any).keplr
      .suggestToken(process.env.NEXT_PUBLIC_CHAIN_ID as string, address)
      .catch((e: any) => {
        console.log(e)
        errorNotify(e.message)
      })
      .then(() => {
        successNotify('Added token to Keplr')
      })
  }
}
