import { useDaoInfoContext } from '@dao-dao/stateless'
import { Action, ProposalPrefill } from '@dao-dao/types'

import {
  DaoProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '../proposal-module-adapter'
import { NewProposalForm } from '../proposal-module-adapter/adapters/DaoProposalSingle/types'

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

export const useEncodedDaoProposalSinglePrefill = ({
  title = '',
  description = '',
  actions,
  proposalModuleId = DaoProposalSingleAdapter.id,
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
