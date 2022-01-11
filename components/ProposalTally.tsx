import {
  ProposalTallyResponse,
  ThresholdResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import {
  CheckCircleIcon,
  UserGroupIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { convertMicroDenomToDenom } from 'util/conversion'

function makeStatBody(
  value: Number,
  units: string,
  max: Number,
  required: Number
) {
  return (
    <>
      <div className="stat-value">{`${value}${units}`}</div>
      <div className="stat-desc">
        <progress
          value={`${value}`}
          max={`${max}`}
          className="progress progress-accent"
        ></progress>
      </div>
      <div className="stat-desc">
        Required: {required}
        {units}
      </div>
    </>
  )
}

function getThresholdStats(tally: ProposalTallyResponse) {
  const threshold = tally.threshold
  let body = null
  if ('absolute_count' in threshold) {
    body = makeStatBody(
      parseInt(tally.total_votes),
      '',
      parseInt(tally.total_weight),
      (threshold as any).absolute_count.weight
    )
  } else if ('absolute_percentage' in threshold) {
    body = makeStatBody(
      parseFloat(tally.quorum) * 100,
      '%',
      100,
      (threshold as any).absolute_percentage.percentage * 100
    )
  } else if ('threshold_quorum' in threshold) {
    // TODO: more info here once the UI supports creating DAOs with this type of threshold.
    body = makeStatBody(
      parseFloat(tally.quorum) * 100,
      '%',
      100,
      (threshold as any).threshold_quorum.quorum * 100
    )
  } else {
    console.log('F')
    return null
  }
  return (
    <div className="w-full stats shadow my-2">
      <div className="stat">
        <div className="stat-figure text-info">
          <UserGroupIcon className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title">Turnout</div>
        {body}
      </div>
    </div>
  )
}

function ProposalTally({
  tally,
  multisig,
}: {
  tally: ProposalTallyResponse
  multisig?: boolean
}) {
  return (
    <>
      <div className="w-full stats shadow mt-2">
        <div className="stat">
          <div className="stat-figure text-success">
            <CheckCircleIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Yes Votes</div>
          <div className="stat-value">
            {multisig
              ? tally.votes.yes
              : convertMicroDenomToDenom(tally.votes.yes)}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <XCircleIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">No Votes</div>
          <div className="stat-value">
            {multisig
              ? tally.votes.no
              : convertMicroDenomToDenom(tally.votes.no)}
          </div>
        </div>
      </div>
      {getThresholdStats(tally)}
    </>
  )
}

export default ProposalTally
