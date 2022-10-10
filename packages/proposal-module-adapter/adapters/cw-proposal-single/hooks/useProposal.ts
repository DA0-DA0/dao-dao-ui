import { useRecoilValue } from 'recoil'

import { Proposal } from '@dao-dao/tstypes/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'

import { useProposalModuleAdapterOptions } from '../../../react'
import { proposalSelector } from '../contracts/CwProposalSingle.common.recoil'

export const useProposal = (): Proposal | SingleChoiceProposal => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    proposalSelector({
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
