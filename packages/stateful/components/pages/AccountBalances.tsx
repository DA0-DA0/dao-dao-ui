import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'

import { walletHexPublicKeySelector } from '@dao-dao/state/recoil'
import { useChain } from '@dao-dao/stateless'
import { transformBech32Address } from '@dao-dao/utils'

import { LazyNftCard } from '../nft'
import { WalletBalances } from '../wallet'

export const AccountBalances = () => {
  const { chain_id: chainId } = useChain()
  const { query: { address } = {} } = useRouter()

  // Type-check. This should already be validated in the Wallet component.
  if (typeof address !== 'string' || !address) {
    throw new Error('Invalid address.')
  }

  const walletAddress = transformBech32Address(address, chainId)

  const hexPublicKey = useRecoilValue(
    walletHexPublicKeySelector({
      chainId,
      walletAddress,
    })
  )

  // Type-check. This should already be validated in the Wallet component.
  if (!hexPublicKey) {
    throw new Error('Invalid public key.')
  }

  return (
    <WalletBalances
      NftCard={LazyNftCard}
      address={walletAddress}
      editable={false}
      hexPublicKey={{
        loading: false,
        updating: false,
        data: hexPublicKey,
      }}
    />
  )
}
