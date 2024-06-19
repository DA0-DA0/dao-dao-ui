import { useLoadingPromise } from '@dao-dao/stateless'

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
  const {
    address: walletAddress,
    isWalletConnecting,
    permit,
    dao,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  const _walletVotingWeight = useLoadingPromise({
    // Loading state if no wallet address.
    promise: walletAddress
      ? () => dao.getVotingPower(walletAddress, blockHeight)
      : undefined,
    // Refresh when permit, DAO, wallet, or block height changes.
    deps: [permit, dao, walletAddress, blockHeight],
  })
  const _totalVotingWeight = useLoadingPromise({
    promise: () => dao.getTotalVotingPower(blockHeight),
    // Refresh when DAO or block height changes.
    deps: [dao, blockHeight],
  })

  const walletVotingWeight =
    !_walletVotingWeight.loading &&
    !_walletVotingWeight.errored &&
    !isNaN(Number(_walletVotingWeight.data))
      ? Number(_walletVotingWeight.data)
      : undefined
  const totalVotingWeight =
    !_totalVotingWeight.loading &&
    !_totalVotingWeight.errored &&
    !isNaN(Number(_totalVotingWeight.data))
      ? Number(_totalVotingWeight.data)
      : undefined
  const isMember =
    walletVotingWeight !== undefined ? walletVotingWeight > 0 : undefined

  return {
    isMember,
    walletVotingWeight,
    totalVotingWeight,
    loading:
      _walletVotingWeight.loading ||
      _totalVotingWeight.loading ||
      isWalletConnecting,
  }
}
