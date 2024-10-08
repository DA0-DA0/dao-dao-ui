import { HugeDecimal } from '@dao-dao/math'
import { DaoSource, LoadingDataWithError } from '@dao-dao/types'

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
  /**
   * Whether or not all of the fields have finished loading.
   */
  loading: boolean
  /**
   * Whether or not the current wallet is a member of the DAO. Will be in the
   * loading state when no wallet is connected.
   */
  loadingIsMember: LoadingDataWithError<boolean>
  /**
   * Whether or not the current wallet is a member of the DAO. Will be undefined
   * until it successfully loads.
   *
   * This should not be used and only exists for backwards compatibility.
   */
  isMember: boolean | undefined
  /**
   * The current wallet voting weight in the DAO. Will be undefined until it
   * successfully loads.
   */
  walletVotingWeight: HugeDecimal | undefined
  /**
   * The current wallet voting weight in the DAO. Will be undefined until it
   * successfully loads.
   */
  totalVotingWeight: HugeDecimal | undefined
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
    !_walletVotingWeight.loading && !_walletVotingWeight.errored
      ? HugeDecimal.from(_walletVotingWeight.data.power)
      : undefined
  const totalVotingWeight =
    !_totalVotingWeight.loading && !_totalVotingWeight.errored
      ? HugeDecimal.from(_totalVotingWeight.data.power)
      : undefined
  const isMember =
    walletVotingWeight !== undefined
      ? walletVotingWeight.isPositive()
      : undefined

  return {
    loading:
      _walletVotingWeight.loading ||
      _totalVotingWeight.loading ||
      isWalletConnecting,
    loadingIsMember:
      _walletVotingWeight.loading || _walletVotingWeight.errored
        ? _walletVotingWeight
        : {
            loading: false,
            errored: false,
            data: isMember ?? false,
          },
    isMember,
    walletVotingWeight,
    totalVotingWeight,
  }
}
