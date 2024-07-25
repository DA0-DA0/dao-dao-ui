import { DaoSource } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from './query/useQueryLoadingDataWithError'
import { useDaoClient } from './useDaoClient'
import { useOnSecretNetworkPermitUpdate } from './useOnSecretNetworkPermitUpdate'
import { useProfile } from './useProfile'
import { useWallet } from './useWallet'

interface UseMembershipOptions {
  /**
   * Override current DAO context.
   */
  dao?: DaoSource
  blockHeight?: number
}

interface UseMembershipResponse {
  loading: boolean
  isMember: boolean | undefined
  walletVotingWeight: number | undefined
  totalVotingWeight: number | undefined
}

export const useMembership = ({
  dao: daoSource,
  blockHeight,
}: UseMembershipOptions = {}): UseMembershipResponse => {
  const { dao } = useDaoClient({
    dao: daoSource,
  })

  // Don't load chain-specific profile because the wallet may not be connected
  // to that chain and thus the correct profile won't load. Instead, fetch the
  // chains from the currently connected profile and find the correct address.
  const { chains } = useProfile()
  const { address: currentWalletAddress, isWalletConnecting } = useWallet({
    chainId: dao.chainId,
  })

  // Use profile chains if present, falling back to the current wallet address.
  const walletAddress =
    (!chains.loading &&
      chains.data.find((c) => c.chainId === dao.chainId)?.address) ||
    currentWalletAddress

  const _walletVotingWeight = useQueryLoadingDataWithError(
    dao.getVotingPowerQuery(walletAddress, blockHeight)
  )
  const _totalVotingWeight = useQueryLoadingDataWithError(
    dao.getTotalVotingPowerQuery(blockHeight)
  )
  // Make sure this component re-renders if the Secret Network permit changes so
  // the voting query above refreshes.
  useOnSecretNetworkPermitUpdate()

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
