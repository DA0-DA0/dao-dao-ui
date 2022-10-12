import {
  CwdProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { NewProposalForm } from '@dao-dao/proposal-module-adapter/adapters/CwdProposalSingle/types'
import { Action, ProposalPrefill } from '@dao-dao/tstypes'
import { useDaoInfoContext } from '@dao-dao/ui'

interface ActionAndData<Data extends {} = any> {
  action: Action<Data, any>
  data: Data
}

export interface UseEncodedProposalPrefillUrlOptions {
  actions: ActionAndData[]
  title?: string
  description?: string
  proposalModuleId?: string
}

export const useEncodedCwdProposalSinglePrefill = ({
  title = '',
  description = '',
  actions,
  proposalModuleId = CwdProposalSingleAdapter.id,
}: UseEncodedProposalPrefillUrlOptions): string | undefined => {
  const { proposalModules } = useDaoInfoContext()

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
      actionData: actions.map(({ action: { key }, data }) => ({
        key,
        data,
      })),
    },
  }

  return encodeURIComponent(JSON.stringify(prefill))
}
