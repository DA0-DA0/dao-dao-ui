import { useRecoilValue, constSelector } from 'recoil'

import { ConfigResponse } from '@dao-dao/state/clients/cw-proposal-single'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { governanceModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'

import { DAO_ADDRESS } from '@/util'

interface UseGovernanceModuleOptions {
  fetchProposalDepositTokenInfo?: boolean
}

interface UseGovernanceModuleResponse {
  governanceModuleAddress?: string
  governanceModuleConfig?: ConfigResponse
  /// Optional
  // Proposal deposit token info
  proposalDepositTokenInfo?: TokenInfoResponse
}

export const useGovernanceModule = ({
  fetchProposalDepositTokenInfo = false,
}: UseGovernanceModuleOptions = {}): UseGovernanceModuleResponse => {
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

  /// Optional

  // Proposal deposit token info
  const proposalDepositTokenInfo = useRecoilValue(
    fetchProposalDepositTokenInfo && governanceModuleConfig?.deposit_info?.token
      ? tokenInfoSelector({
          contractAddress: governanceModuleConfig.deposit_info.token,
          params: [],
        })
      : constSelector(undefined)
  )

  return {
    governanceModuleAddress,
    governanceModuleConfig,
    proposalDepositTokenInfo,
  }
}
