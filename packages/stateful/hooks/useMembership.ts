import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable, useChain } from '@dao-dao/stateless'

import { useWalletWithSecretNetworkPermit } from './useWalletWithSecretNetworkPermit'

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
  const {
    isSecretNetwork,
    address: walletAddress,
    isWalletConnecting,
    permit,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  // Use loadable to prevent flickering loading states when wallet address
  // changes and on initial load if wallet is connecting.
  const _walletVotingWeight = useCachedLoadable(
    (isSecretNetwork ? permit : walletAddress)
      ? DaoCoreV2Selectors.votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          chainId,
          params: [
            {
              height: blockHeight,
              ...(isSecretNetwork
                ? { auth: { permit } }
                : { address: walletAddress }),
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
      _totalVotingWeight.state === 'loading' ||
      isWalletConnecting,
  }
}
