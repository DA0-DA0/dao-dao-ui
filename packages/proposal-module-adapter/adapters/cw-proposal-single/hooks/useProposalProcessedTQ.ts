import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { ProcessedThresholdQuorum } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useProcessTQ } from '../common'

export const useProposalProcessedTQ = (): ProcessedThresholdQuorum => {
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

  const processTQ = useProcessTQ()

  return useMemo(
    () => processTQ(proposal.threshold),
    [processTQ, proposal.threshold]
  )
}
