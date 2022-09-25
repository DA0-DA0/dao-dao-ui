export interface ProposalIdDisplayProps {
  proposalPrefix: string
  proposalNumber: number
}

export const ProposalIdDisplay = ({
  proposalPrefix,
  proposalNumber,
}: ProposalIdDisplayProps) => (
  <>
    {proposalPrefix}
    {proposalNumber}
  </>
)
