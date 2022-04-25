import { useRecoilValue, constSelector } from 'recoil'

import { blockHeightSelector, useWallet } from '@dao-dao/state'
import { Claim, GetConfigResponse } from '@dao-dao/state/clients/stake-cw20'
import { stakingContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import {
  getConfigSelector,
  claimsSelector,
  totalStakedAtHeightSelector,
} from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { claimAvailable } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from '.'

interface UseStakingOptions {
  fetchClaims?: boolean
  fetchTotalStaked?: boolean
}

interface UseStakingResponse {
  stakingContractAddress?: string
  stakingContractConfig?: GetConfigResponse
  /// Optional
  // Claims
  blockHeight?: number
  claims?: Claim[]
  sumClaimsAvailable?: number
  // Total staked
  totalStaked?: number
}

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStaked = false,
}: UseStakingOptions = {}): UseStakingResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useGovernanceTokenInfo()

  const stakingContractAddress = useRecoilValue(
    votingModuleAddress
      ? stakingContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const stakingContractConfig = useRecoilValue(
    stakingContractAddress
      ? getConfigSelector({ contractAddress: stakingContractAddress })
      : constSelector(undefined)
  )

  /// Optional

  // Claims
  const blockHeight = useRecoilValue(
    fetchClaims ? blockHeightSelector : constSelector(undefined)
  )
  const _claims = useRecoilValue(
    fetchClaims && walletAddress && stakingContractAddress
      ? claimsSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.claims
  // TODO: Remove.
  const claims = [
    {
      amount: '100000000',
      release_at: {
        at_time: ((new Date().getTime() + 10000) * 1000000).toString(),
      },
    },
    {
      amount: '2050000000',
      release_at: {
        at_time: ((new Date().getTime() + 3200000) * 1000000).toString(),
      },
    },
    {
      amount: '20500009000',
      release_at: {
        at_time: ((new Date().getTime() + 32005000) * 1000000).toString(),
      },
    },
  ]

  const sumClaimsAvailable =
    fetchClaims && blockHeight !== undefined
      ? claims
          ?.filter((c) => claimAvailable(c, blockHeight))
          .reduce((p, c) => p + Number(c.amount), 0)
      : undefined

  // Total staked
  const totalStakedAtHeight = useRecoilValue(
    fetchTotalStaked && stakingContractAddress
      ? totalStakedAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )

  return {
    stakingContractAddress,
    stakingContractConfig,
    /// Optional
    // Claims
    blockHeight,
    claims,
    sumClaimsAvailable,
    // Total staked
    totalStaked: totalStakedAtHeight && Number(totalStakedAtHeight.total),
  }
}
