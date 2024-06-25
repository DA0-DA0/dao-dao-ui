import { useQueryLoadingDataWithError } from './useQueryLoadingDataWithError'
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
    dao,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  // TODO(dao-client secret): make sure these refresh when the permit updates
  const _walletVotingWeight = useQueryLoadingDataWithError(
    dao.getVotingPowerQuery(walletAddress, blockHeight)
  )
  const _totalVotingWeight = useQueryLoadingDataWithError(
    dao.getTotalVotingPowerQuery(blockHeight)
  )

  const walletVotingWeight =
    !_walletVotingWeight.loading &&
    !_walletVotingWeight.errored &&
    !isNaN(Number(_walletVotingWeight.data.power))
      ? Number(_walletVotingWeight.data.power)
      : undefined
  const totalVotingWeight =
    !_totalVotingWeight.loading &&
    !_totalVotingWeight.errored &&
    !isNaN(Number(_totalVotingWeight.data.power))
      ? Number(_totalVotingWeight.data.power)
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
