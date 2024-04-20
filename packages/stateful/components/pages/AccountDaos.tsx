import { useRouter } from 'next/router'

import { WalletDaos } from '../wallet'

export const AccountDaos = () => {
  const { query: { address } = {} } = useRouter()

  // Type-check. This should already be validated in the Wallet component.
  if (typeof address !== 'string' || !address) {
    throw new Error('Invalid address.')
  }

  return <WalletDaos address={address} />
}
