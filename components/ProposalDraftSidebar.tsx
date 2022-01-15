import { draftProposalAtom } from "atoms/proposals"
import { useRecoilValue } from "recoil"
import ProposalStatus from "./ProposalStatus"

export function ProposalDraftSidebar({
  contractAddress,
  proposalId
}: {
  contractAddress: string
  proposalId: number
}) {
  const draftProposal = useRecoilValue(
    draftProposalAtom({ contractAddress, proposalId })
  )

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

    </div>
  ) : <div>Error: Draft Proposal Not found</div>
}
