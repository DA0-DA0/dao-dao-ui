import { useRecoilValue, constSelector } from 'recoil'

import { governanceModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'

import { DAO_ADDRESS } from '@/util/constants'

export const useGovernanceModule = () => {
  const governanceModuleAddress = useRecoilValue(
    governanceModulesSelector({ contractAddress: DAO_ADDRESS, params: [{}] })
  )?.[0]
  const governanceModuleConfig = useRecoilValue(
    governanceModuleAddress
      ? configSelector({
          contractAddress: governanceModuleAddress,
        })
      : constSelector(undefined)
  )

  return {
    governanceModuleAddress,
    governanceModuleConfig,
  }
}
