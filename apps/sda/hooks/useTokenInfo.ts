import { useRecoilValue, constSelector } from 'recoil'

import { govTokenInfoSelector } from '@dao-dao/state'
import { votingModuleSelector } from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import { tokenContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'

import { DAO_ADDRESS } from '@/util/constants'

export const useTokenInfo = () => {
  const votingModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: DAO_ADDRESS })
  )
  const tokenContractAddress = useRecoilValue(
    votingModuleAddress
      ? tokenContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const tokenInfo = useRecoilValue(
    tokenContractAddress
      ? govTokenInfoSelector(tokenContractAddress)
      : constSelector(undefined)
  )

  return {
    votingModuleAddress,
    tokenContractAddress,
    tokenInfo,
  }
}
