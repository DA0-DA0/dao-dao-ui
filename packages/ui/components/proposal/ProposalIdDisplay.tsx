export interface ProposalIdDisplayProps {
  proposalPrefix: string
  proposalNumber: number
}

export const ProposalIdDisplay = ({
  proposalPrefix,
  proposalNumber,
}: ProposalIdDisplayProps) => (
  <span className="inline-block w-10">
    {proposalPrefix}
    {proposalNumber}
  </span>
)
