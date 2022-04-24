import { useRecoilValue, constSelector } from 'recoil'

import { govTokenInfoSelector } from '@dao-dao/state'
import { votingModuleSelector } from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import { tokenContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'

import { DAO_ADDRESS } from '@/util'

export const useGovernanceTokenInfo = () => {
  const votingModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: DAO_ADDRESS })
  )
  const governanceTokenContractAddress = useRecoilValue(
    votingModuleAddress
      ? tokenContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const governanceTokenInfo = useRecoilValue(
    governanceTokenContractAddress
      ? govTokenInfoSelector(governanceTokenContractAddress)
      : constSelector(undefined)
  )

  return {
    votingModuleAddress,
    governanceTokenContractAddress,
    governanceTokenInfo,
  }
}
