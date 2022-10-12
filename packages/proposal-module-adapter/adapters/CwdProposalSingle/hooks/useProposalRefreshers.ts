import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshProposalIdAtom, refreshProposalsIdAtom } from '@dao-dao/state'

import { useProposalModuleAdapterOptions } from '../../../react/context'

export const useProposalRefreshers = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const setRefreshProposalId = useSetRecoilState(
    refreshProposalIdAtom({
      address: proposalModuleAddress,
      proposalId: proposalNumber,
    })
  )

  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)
  }, [setRefreshProposalId])

  const refreshProposalAndAll = useCallback(() => {
    setRefreshProposalsId((id) => id + 1)
    refreshProposal()
  }, [setRefreshProposalsId, refreshProposal])

  return {
    refreshProposal,
    refreshProposalAndAll,
  }
}
