import LineAlert from 'components/LineAlert'
import { VoteInfo } from 'types/cw3'

function VoteButtons({
  onVoteYes = () => {},
  onVoteNo = () => {},
  votes = [] as VoteInfo[],
  walletAddress = '',
  status = '',
}) {
  const [vote]: VoteInfo[] = votes.filter(
    (v: VoteInfo) => v.voter === walletAddress
  )

  if (vote) {
    const variant =
      vote.vote === 'yes' ? 'success' : vote.vote === 'no' ? 'error' : 'error'
    const msg = `You voted ${vote.vote}`
    return <LineAlert className="mt-2" variant={variant} msg={msg} />
  }

  if (status !== 'open') {
    return null
  }
  return (
    <div className="flex justify-between content-center mt-2">
      <button
        className="box-border px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
        onClick={onVoteYes}
      >
        Vote Yes
      </button>
      <button
        className="box-border px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
        onClick={onVoteNo}
      >
        Vote No
      </button>
    </div>
  )
}

export default VoteButtons
