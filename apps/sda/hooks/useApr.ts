import { useRecoilValue, constSelector } from 'recoil'

import { useStakingInfo } from '@dao-dao/state'
import { rewardsRateSelector } from '@dao-dao/state/recoil/selectors/clients/cw-rewards'
import { totalValueSelector } from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { JUNO_BLOCKS_PER_YEAR } from '@dao-dao/utils'

import { DAO_ADDRESS, REWARDS_ADDRESS } from '@/util'

export const useApr = () => {
  const { stakingContractAddress } = useStakingInfo(DAO_ADDRESS)

  // rate * blocks_per_year / total_value_staked
  const rate = useRecoilValue(
    REWARDS_ADDRESS
      ? rewardsRateSelector(REWARDS_ADDRESS)
      : constSelector(undefined)
  )
  const totalValueStaked = useRecoilValue(
    stakingContractAddress
      ? totalValueSelector({ contractAddress: stakingContractAddress })
      : constSelector(undefined)
  )
  const apr =
    totalValueStaked && rate
      ? (Number(rate) * JUNO_BLOCKS_PER_YEAR) / Number(totalValueStaked.total)
      : undefined

  return apr
}
