import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { Proposal } from '@dao-dao/state/clients/cw-proposal-single'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useProposal = (): Proposal => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  return proposal
}
