import { useRouter } from 'next/router'

import { ProfileWallet } from '../profile'

export const AccountWallet = () => {
  const { query: { address } = {} } = useRouter()

  // Type-check. This should already be validated in the Wallet component.
  if (typeof address !== 'string' || !address) {
    throw new Error('Invalid address.')
  }

  return <ProfileWallet address={address} />
}
