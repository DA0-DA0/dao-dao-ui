export interface ProposalIdDisplayProps {
  proposalPrefix: string
  proposalNumber: number
}

export const ProposalIdDisplay = ({
  proposalPrefix,
  proposalNumber,
}: ProposalIdDisplayProps) => (
  <>
    {proposalPrefix ? `${proposalPrefix} # ` : '# '}
    {proposalNumber.toString().padStart(8 - proposalPrefix.length, '0')}
  </>
)
