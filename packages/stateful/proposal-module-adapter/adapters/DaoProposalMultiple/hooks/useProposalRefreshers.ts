import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshProposalIdAtom, refreshProposalsIdAtom } from '@dao-dao/state'
import { ProposalRefreshers } from '@dao-dao/types'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { useLoadingProposal } from './useLoadingProposal'

export const useProposalRefreshers = (): ProposalRefreshers => {
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

  const loadingProposal = useLoadingProposal()

  return {
    refreshProposal,
    refreshProposalAndAll,
    refreshing: loadingProposal.loading || !!loadingProposal.updating,
  }
}
