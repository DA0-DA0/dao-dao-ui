import { ProposalVoteOption } from '../proposal-module-adapter'

export type ProposalVoterProps<Vote extends unknown = unknown> = {
  /**
   * Whether or not the vote process is loading.
   */
  loading: boolean
  /**
   * If the current wallet has voted, this is their current vote.
   */
  currentVote?: Vote
  /**
   * Function to cast a vote.
   */
  onCastVote: (vote: Vote) => void | Promise<void>
  /**
   * Vote options.
   */
  options: ProposalVoteOption<Vote>[]
  /**
   * Whether or not the proposal is still open. If not, and voting is still
   * allowed, explain that the user can vote up until expiration even though the
   * proposal outcome is already determined.
   */
  proposalOpen: boolean
  /**
   * Whether or not the user has viewed all action pages. If they haven't, they
   * can't vote.
   */
  seenAllActionPages?: boolean
  /**
   * An optional class name for the container.
   */
  className?: string
}
