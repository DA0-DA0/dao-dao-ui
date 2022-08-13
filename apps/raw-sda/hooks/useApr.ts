import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20StakedBalanceVotingSelectors,
  CwRewardsSelectors,
  StakeCw20Selectors,
  useVotingModule,
} from '@dao-dao/state'
import { JUNO_BLOCKS_PER_YEAR } from '@dao-dao/utils'

import { DAO_ADDRESS, REWARDS_ADDRESS } from '@/util'

export const useApr = () => {
  const { votingModuleAddress } = useVotingModule(DAO_ADDRESS)

  // Assumes DAO is using cw20-staked-balance-voting.
  const stakingContractAddress = useRecoilValue(
    Cw20StakedBalanceVotingSelectors.stakingContractSelector({
      contractAddress: votingModuleAddress,
    })
  )

  // rate * blocks_per_year / total_value_staked
  const rate = useRecoilValue(
    REWARDS_ADDRESS
      ? CwRewardsSelectors.rewardsRateSelector(REWARDS_ADDRESS)
      : constSelector(undefined)
  )
  const totalValueStaked = useRecoilValue(
    StakeCw20Selectors.totalValueSelector({
      contractAddress: stakingContractAddress,
    })
  )
  const apr = rate
    ? (Number(rate) * JUNO_BLOCKS_PER_YEAR) / Number(totalValueStaked.total)
    : undefined

  return apr
}
