import { useRecoilValue, constSelector } from 'recoil'

import { ConfigResponse } from '@dao-dao/state/clients/cw-proposal-single'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { proposalModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'

import { DAO_ADDRESS, OLD_PROPOSALS_ADDRESS } from '@/util'

interface UseProposalModuleOptions {
  fetchProposalDepositTokenInfo?: boolean
  // If the `OLD_PROPOSALS_ADDRESS` should be used. Used if the DAO has updated
  // it's governance module and would still like to show those old proposals.
  old?: boolean
}

interface UseProposalModuleResponse {
  proposalModuleAddress?: string
  proposalModuleConfig?: ConfigResponse
  /// Optional
  // Proposal deposit token info
  proposalDepositTokenInfo?: TokenInfoResponse
}

export const useProposalModule = ({
  fetchProposalDepositTokenInfo = false,
  old = false,
}: UseProposalModuleOptions = {}): UseProposalModuleResponse => {
  const proposalModuleAddress = useRecoilValue(
    old
      ? constSelector([OLD_PROPOSALS_ADDRESS])
      : proposalModulesSelector({ contractAddress: DAO_ADDRESS, params: [{}] })
  )?.[0]
  const proposalModuleConfig = useRecoilValue(
    proposalModuleAddress
      ? configSelector({
          contractAddress: proposalModuleAddress,
        })
      : constSelector(undefined)
  )

  /// Optional

  // Proposal deposit token info
  const proposalDepositTokenInfo = useRecoilValue(
    fetchProposalDepositTokenInfo && proposalModuleConfig?.deposit_info?.token
      ? tokenInfoSelector({
          contractAddress: proposalModuleConfig.deposit_info.token,
          params: [],
        })
      : constSelector(undefined)
  )

  return {
    proposalModuleAddress,
    proposalModuleConfig,
    proposalDepositTokenInfo,
  }
}
