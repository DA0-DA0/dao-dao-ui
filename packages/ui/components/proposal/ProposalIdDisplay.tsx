export interface ProposalIdDisplayProps {
  proposalPrefix: string
  proposalNumber: number
}

export const ProposalIdDisplay = ({
  proposalPrefix,
  proposalNumber,
}: ProposalIdDisplayProps) => (
  <>
    {proposalPrefix}-
    {'0'.repeat(6 - proposalPrefix.length - proposalNumber.toString().length)}
    {proposalNumber}
  </>
)
