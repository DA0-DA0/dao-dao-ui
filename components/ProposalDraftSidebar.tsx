import { draftProposalAtom } from 'atoms/proposals'
import { useRecoilState, useRecoilValue } from 'recoil'
import ProposalStatus from './ProposalStatus'
import { loadingAtom } from 'atoms/status'

export function ProposalDraftSidebar({
  contractAddress,
  proposalId,
}: {
  contractAddress: string
  proposalId: number
}) {
  const draftProposal = useRecoilValue(
    draftProposalAtom({ contractAddress, proposalId })
  )
  const [loading, setLoading] = useRecoilState(loadingAtom)
  const deleteDraftProposal = () => {
    // this should be a transaction
    // const updatedProposals = { ...draftProposals }
    // delete updatedProposals[proposalId + '']
    // const updatedMap = {
    //   ...contractProposalMap,
    //   [contractAddress]: updatedProposals,
    // }
    // // Clear the map entry if no data
    // if (Object.keys(updatedProposals).length === 0) {
    //   delete updatedMap[contractAddress]
    // }
    // setContractProposalMap(updatedMap)
  }

  return draftProposal ? (
    <div>
      <h2 className="font-medium text-sm font-mono mb-8 text-secondary">
        Proposal {draftProposal.id}
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
  ) : (
    <div>Error: Draft Proposal Not found</div>
  )
}
