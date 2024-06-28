import { DaoSource } from '@dao-dao/types'

import { useDaoClient } from './useDaoClient'
import { useOnSecretNetworkPermitUpdate } from './useOnSecretNetworkPermitUpdate'
import { useQueryLoadingDataWithError } from './useQueryLoadingDataWithError'
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
  const { address: walletAddress, isWalletConnecting } = useWallet()
  const { dao } = useDaoClient({
    dao: daoSource,
  })

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
