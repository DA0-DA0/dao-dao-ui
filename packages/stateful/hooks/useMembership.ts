import { useWallet } from '@noahsaso/cosmodal'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable, useChain } from '@dao-dao/stateless'

interface UseMembershipOptions {
  coreAddress: string
  blockHeight?: number
}

interface UseMembershipResponse {
  loading: boolean
  isMember: boolean | undefined
  walletVotingWeight: number | undefined
  totalVotingWeight: number | undefined
}

export const useMembership = ({
  coreAddress,
  blockHeight,
}: UseMembershipOptions): UseMembershipResponse => {
  const { chain_id: chainId } = useChain()
  const { address: walletAddress } = useWallet()

  // Use loadable to prevent flickering loading states when wallet address
  // changes and on initial load if wallet is connecting.
  const _walletVotingWeight = useCachedLoadable(
    walletAddress
      ? DaoCoreV2Selectors.votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          chainId,
          params: [
            {
              address: walletAddress,
              height: blockHeight,
            },
          ],
        })
      : undefined
  )
  const _totalVotingWeight = useCachedLoadable(
    DaoCoreV2Selectors.totalPowerAtHeightSelector({
      contractAddress: coreAddress,
      chainId,
      params: [
        {
          height: blockHeight,
        },
      ],
    })
  )

  const walletVotingWeight =
    _walletVotingWeight.state === 'hasValue' &&
    !isNaN(Number(_walletVotingWeight.contents.power))
      ? Number(_walletVotingWeight.contents.power)
      : undefined
  const totalVotingWeight =
    _totalVotingWeight.state === 'hasValue' &&
    !isNaN(Number(_totalVotingWeight.contents.power))
      ? Number(_totalVotingWeight.contents.power)
      : undefined
  const isMember =
    walletVotingWeight !== undefined ? walletVotingWeight > 0 : undefined

  return {
    isMember,
    walletVotingWeight,
    totalVotingWeight,
    loading:
      _walletVotingWeight.state === 'loading' ||
      _totalVotingWeight.state === 'loading',
  }
}
