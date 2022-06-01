import toast from 'react-hot-toast'

export function addToken(address: string) {
  if (typeof window !== 'undefined') {
    ;(window as any).keplr
      .suggestToken(process.env.NEXT_PUBLIC_CHAIN_ID as string, address)
      .catch((e: any) => {
        console.log(e)
        toast.error(e.message)
      })
      .then(() => {
        toast.success('Added token to Keplr')
      })
  }
}
