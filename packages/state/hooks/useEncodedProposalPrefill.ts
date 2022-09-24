import { useDaoInfoContext } from '@dao-dao/common'
import {
  CwProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { NewProposalForm } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/types'
import { Action, ProposalPrefill } from '@dao-dao/tstypes'

export interface UseProposalPrefillUrlOptions<D extends {}> {
  action: Action<any, D>
  data?: D
  title?: string
  description?: string
  proposalModuleId?: string
}

export const useEncodedProposalPrefill = <D extends {}>({
  action,
  title = '',
  description = '',
  data,
  proposalModuleId = CwProposalSingleAdapter.id,
}: UseProposalPrefillUrlOptions<D>): string | undefined => {
  const { coreAddress, proposalModules } = useDaoInfoContext()

  const defaults = action.useDefaults(coreAddress)

  const hasProposalModule = proposalModules.some(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id === proposalModuleId
  )
  if (!hasProposalModule) {
    return undefined
  }

  const prefill: ProposalPrefill<NewProposalForm> = {
    id: proposalModuleId,
    data: {
      title,
      description,
      actionData: [
        {
          key: action.key,
          data: data ?? defaults,
        },
      ],
    },
  }

  return encodeURIComponent(JSON.stringify(prefill))
}
