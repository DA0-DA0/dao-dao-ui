import { useRecoilValue } from 'recoil'

import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'

import { useProposalModuleAdapterOptions } from '../../../react'
import { proposalSelector } from '../contracts/DaoProposalSingle.common.recoil'

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
