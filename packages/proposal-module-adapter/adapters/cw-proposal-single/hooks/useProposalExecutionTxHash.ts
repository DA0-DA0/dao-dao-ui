import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import {
  CwProposalSingleSelectors,
  proposalExecutionTXHashSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useProposalExecutionTxHash = () => {
  const { t } = useTranslation()
  const { proposalModuleAddress, proposalNumber } =
    useProposalModuleAdapterOptions()

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

  const executionTxHash = useRecoilValue(
    proposal.status === Status.Executed
      ? proposalExecutionTXHashSelector({
          contractAddress: proposalModuleAddress,
          proposalId: proposalNumber,
        })
      : constSelector(undefined)
  )

  return executionTxHash
}
