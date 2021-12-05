import { VoteInfo } from '@dao-dao/types/contracts/cw3-dao'

function ProposalVotes({ votes }: { votes: VoteInfo[] }) {
  return (
    <table className="table w-full">
      <thead>
        <th>Voter</th>
        <th>Weight</th>
        <th>Vote</th>
      </thead>
      <tbody>
        {!votes ||
          (votes.length < 1 && (
            <tr>
              <td className="text-center" colSpan={3}>
                This proposal currently has no votes
              </td>
            </tr>
          ))}
        {votes.map(({ voter, weight, vote }) => (
          <tr key={voter}>
            <td>{voter}</td>
            <td>{weight}</td>
            <td>{vote}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProposalVotes
