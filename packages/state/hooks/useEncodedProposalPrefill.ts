import { useDaoInfoContext } from '@dao-dao/common'
import {
  CwProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { NewProposalForm } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/types'
import { Action, ProposalPrefill } from '@dao-dao/tstypes'
import { useRef } from 'react'

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

export const useEncodedProposalPrefill = ({
  title = '',
  description = '',
  actions,
  proposalModuleId = CwProposalSingleAdapter.id,
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
