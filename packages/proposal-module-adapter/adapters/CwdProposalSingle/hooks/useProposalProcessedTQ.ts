import { useMemo } from 'react'

import { ProcessedThresholdQuorum } from '@dao-dao/types'

import { useProcessTQ } from '../common'
import { useProposal } from './useProposal'

export const useProposalProcessedTQ = (): ProcessedThresholdQuorum => {
  const proposal = useProposal()
  const processTQ = useProcessTQ()

  return useMemo(
    () => processTQ(proposal.threshold),
    [processTQ, proposal.threshold]
  )
}
