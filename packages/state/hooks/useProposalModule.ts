import { useRecoilValue, constSelector } from 'recoil'

import {
  ConfigResponse,
  ProposalResponse,
} from '@dao-dao/state/clients/cw-proposal-single'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { proposalModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  configSelector,
  listProposalsSelector,
  proposalCountSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'

interface UseProposalModuleOptions {
  fetchProposalDepositTokenInfo?: boolean
  fetchProposalCount?: boolean
  fetchProposalResponses?: boolean
  // Used if the DAO has updated its governance module and would still
  // like to show those old proposals.
  oldProposalsAddress?: string
}

interface UseProposalModuleResponse {
  proposalModuleAddress?: string
  proposalModuleConfig?: ConfigResponse
  /// Optional
  // Proposal deposit token info
  proposalDepositTokenInfo?: TokenInfoResponse
  // Proposal count
  proposalCount?: number
  // Proposal responses
  proposalResponses?: ProposalResponse[]
}

export const useProposalModule = (
  coreAddress: string,
  {
    fetchProposalDepositTokenInfo = false,
    fetchProposalCount = false,
    fetchProposalResponses = false,
    oldProposalsAddress,
  }: UseProposalModuleOptions = {}
): UseProposalModuleResponse => {
  const proposalModuleAddress = useRecoilValue(
    oldProposalsAddress
      ? constSelector([oldProposalsAddress])
      : proposalModulesSelector({ contractAddress: coreAddress, params: [{}] })
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

  // Proposal count
  const proposalCount = useRecoilValue(
    fetchProposalCount && proposalModuleAddress
      ? proposalCountSelector({
          contractAddress: proposalModuleAddress,
        })
      : constSelector(undefined)
  )

  // Proposal responses
  const proposalResponses = useRecoilValue(
    fetchProposalResponses && proposalModuleAddress
      ? listProposalsSelector({
          contractAddress: proposalModuleAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.proposals

  return {
    proposalModuleAddress,
    proposalModuleConfig,
    proposalDepositTokenInfo,
    proposalCount,
    proposalResponses,
  }
}
