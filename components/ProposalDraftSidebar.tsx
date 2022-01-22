import { draftProposalSelector, draftProposalsSelector } from 'selectors/proposals'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ProposalStatus } from './ProposalStatus'
import { loadingAtom } from 'atoms/status'

export function ProposalDraftSidebar({
  contractAddress,
  proposalId,
}: {
  contractAddress: string
  proposalId: string
}) {
  const draftProposal = useRecoilValue(
    draftProposalSelector({ contractAddress, proposalId })
  )
  const [loading, setLoading] = useRecoilState(loadingAtom)
  const [draftProposals, setDraftProposals] = useRecoilState(draftProposalsSelector(contractAddress))
  const deleteDraftProposal = () => {
    const updatedProposals = { ...draftProposals }
    delete updatedProposals[proposalId + '']
    setDraftProposals(updatedProposals)
  }

  return (<div>
      <h2 className="font-medium text-sm font-mono mb-8 text-secondary">
        Proposal {draftProposal?.id || proposalId}
      </h2>
      <div className="grid grid-cols-3">
        <p className="text-secondary">Status</p>
        <div className="col-span-2">
          <ProposalStatus status="draft" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-secondary">This is a draft proposal</p>
      </div>
      <button
        key="delete_draft"
        className={`btn btn-secondary text-lg mt-8 ml-auto ${
          loading ? 'loading' : ''
        }`}
        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          deleteDraftProposal()
        }}
      >
        Delete Draft
      </button>
    </div>
  )
}
