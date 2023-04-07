import { useDaoInfoContext } from '@dao-dao/stateless'
import {
  PartialCategorizedActionKeyAndDataNoId,
  ProposalPrefill,
} from '@dao-dao/types'
import { DaoProposalSingleAdapterId } from '@dao-dao/utils'

import { matchAdapter as matchProposalModuleAdapter } from '../proposal-module-adapter'
import { NewProposalForm } from '../proposal-module-adapter/adapters/DaoProposalSingle/types'

export interface UseEncodedProposalPrefillUrlOptions {
  actions: PartialCategorizedActionKeyAndDataNoId[]
  title?: string
  description?: string
  proposalModuleId?: string
}

export const useDaoProposalSinglePrefill = ({
  title = '',
  description = '',
  actions,
  proposalModuleId = DaoProposalSingleAdapterId,
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
      actionData: actions.map((action, index) => ({
        _id: index.toString(),
        ...action,
      })),
    },
  }

  return JSON.stringify(prefill)
}
