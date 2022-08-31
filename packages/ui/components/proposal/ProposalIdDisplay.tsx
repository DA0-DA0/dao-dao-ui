export interface ProposalIdDisplayProps {
  proposalPrefix: string
  proposalNumber: number
}

export const ProposalIdDisplay = ({
  proposalPrefix,
  proposalNumber,
}: ProposalIdDisplayProps) => (
  <>
    {proposalPrefix ? `${proposalPrefix} #` : '#'}
    {proposalNumber.toString().padStart(7 - proposalPrefix.length, '0')}
  </>
)
