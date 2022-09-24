export interface ProposalIdDisplayProps {
  proposalPrefix: string
  proposalNumber: number
}

export const ProposalIdDisplay = ({
  proposalPrefix,
  proposalNumber,
}: ProposalIdDisplayProps) => (
  <>
    <span className="text-text-primary">{proposalPrefix}</span>
    <span className="text-text-tertiary">
      {' '}
      {'0'.repeat(7 - proposalPrefix.length - proposalNumber.toString().length)}
    </span>
    <span className="text-text-primary">{proposalNumber}</span>
  </>
)
