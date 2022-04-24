import { useRecoilValue, constSelector } from 'recoil'

import { blockHeightSelector, useWallet } from '@dao-dao/state'
import { stakingContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import {
  getConfigSelector,
  claimsSelector,
} from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { claimAvailable } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from '.'

export const useStaking = () => {
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

  const unstakingDuration = stakingContractConfig?.unstaking_duration ?? null

  const blockHeight = useRecoilValue(blockHeightSelector)
  const claims =
    useRecoilValue(
      walletAddress && stakingContractAddress
        ? claimsSelector({
            contractAddress: stakingContractAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    )?.claims ?? []
  // TODO: Remove.
  claims.push(
    ...[
      {
        amount: '100000000',
        release_at: {
          at_time: ((new Date().getTime() + 100000) * 1000000).toString(),
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
  )
  const sumClaimsAvailable =
    blockHeight !== undefined
      ? claims
          .filter((c) => claimAvailable(c, blockHeight))
          .reduce((p, c) => p + Number(c.amount), 0)
      : 0

  return {
    stakingContractAddress,
    stakingContractConfig,
    unstakingDuration,
    blockHeight,
    claims,
    sumClaimsAvailable,
  }
}
