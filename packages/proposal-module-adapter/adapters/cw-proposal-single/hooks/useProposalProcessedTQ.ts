import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { ProcessedThresholdQuorum } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useProcessTQ } from '../common'

export const useProposalProcessedTQ = (): ProcessedThresholdQuorum => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )?.proposal

  if (!proposal) {
    throw new Error(t('error.loadingData'))
  }

  const processTQ = useProcessTQ()

  return useMemo(
    () => processTQ(proposal.threshold),
    [processTQ, proposal.threshold]
  )
}
