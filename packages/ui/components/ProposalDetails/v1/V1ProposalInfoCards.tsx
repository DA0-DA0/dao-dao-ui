import { ExternalLinkIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { TriangleUp } from '@dao-dao/icons'
import {
  Proposal,
  ProposalResponse,
  Status,
  Vote,
} from '@dao-dao/state/clients/cw-proposal-single'
import {
  CHAIN_TXN_URL_PREFIX,
  convertMicroDenomToDenomWithDecimals,
  expirationAtTimeToSecondsFromNow,
  secondsToWdhms,
} from '@dao-dao/utils'
import { processThresholdData } from '@dao-dao/utils/v1'

import { CopyToClipboard } from '../../CopyToClipboard'
import { Progress } from '../../Progress'
import { ProposalStatus } from '../../ProposalStatus'
import { Tooltip } from '../../Tooltip'
import { VoteDisplay } from './VoteDisplay'

interface V1ProposalInfoCardProps {
  proposalResponse: ProposalResponse
  memberWhenProposalCreated: boolean
  walletVote?: Vote
  proposalExecutionTXHash: string | undefined
  connected: boolean
}

interface V1ProposalInfoVoteStatusProps {
  proposal: Proposal
  tokenDecimals: number
  // Undefined if max voting period is in blocks.
  maxVotingSeconds?: number
}

interface YouTooltipProps {
  label: string
}

const YouTooltip: FC<YouTooltipProps> = ({ label }) => (
  <Tooltip label={label}>
    <p className="flex justify-center items-center p-1 w-4 h-4 font-mono text-xs text-tertiary rounded-full border cursor-pointer border-tertiary">
      ?
    </p>
  </Tooltip>
)

export const V1ProposalInfoCard: FC<V1ProposalInfoCardProps> = ({
  proposalResponse: { id, proposal },
  memberWhenProposalCreated,
  walletVote,
  proposalExecutionTXHash,
  connected,
}) => (
  <div className="rounded-md border border-light">
    <div className="flex flex-row justify-evenly items-stretch py-4 md:py-5">
      <div className="flex flex-col gap-2 items-center">
        <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
          Proposal
        </p>

        <p className="font-mono text-sm"># {id.toString().padStart(6, '0')}</p>
      </div>

      <div className="w-[1px] bg-light"></div>

      <div className="flex flex-col gap-2 items-center">
        <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
          Status
        </p>

        <div className="font-mono text-sm">
          <ProposalStatus status={proposal.status} />
        </div>
      </div>

      <div className="w-[1px] bg-light"></div>

      <div className="flex flex-col gap-2 items-center">
        <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
          You
        </p>

        {connected ? (
          !memberWhenProposalCreated ? (
            <YouTooltip
              label={`You ${
                proposal.status === Status.Open ? 'are' : 'were'
              } unable to vote on this proposal because you didn't have any voting power at the time of proposal creation.`}
            />
          ) : walletVote ? (
            <VoteDisplay vote={walletVote} />
          ) : proposal.status === Status.Open ? (
            <YouTooltip label="You have not yet cast a vote." />
          ) : (
            <YouTooltip label="You didn't cast a vote when this proposal was open." />
          )
        ) : (
          <YouTooltip label="Connect your wallet to view your vote." />
        )}
      </div>
    </div>
    <div className="flex flex-col gap-3 p-5 border-t border-light md:p-7">
      <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
        <p className="col-span-3 font-mono text-sm text-tertiary">Proposer</p>
        <div className="col-span-7">
          <CopyToClipboard takeN={9} value={proposal.proposer} />
        </div>
      </div>

      {proposal.status === Status.Executed && !proposalExecutionTXHash ? (
        <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
          <p className="col-span-3 font-mono text-sm text-tertiary">TX</p>
          <p className="col-span-7">Loading...</p>
        </div>
      ) : !!proposalExecutionTXHash ? (
        <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
          {CHAIN_TXN_URL_PREFIX ? (
            <a
              className="flex flex-row col-span-3 gap-1 items-center font-mono text-sm text-tertiary"
              href={CHAIN_TXN_URL_PREFIX + proposalExecutionTXHash}
              rel="noopener noreferrer"
              target="_blank"
            >
              TX
              <ExternalLinkIcon width={16} />
            </a>
          ) : (
            <p className="col-span-3 font-mono text-sm text-tertiary">TX</p>
          )}
          <div className="col-span-7">
            <CopyToClipboard takeN={9} value={proposalExecutionTXHash} />
          </div>
        </div>
      ) : null}
    </div>
  </div>
)

export const V1ProposalInfoVoteStatus: FC<V1ProposalInfoVoteStatusProps> = ({
  proposal,
  tokenDecimals,
  maxVotingSeconds,
}) => {
  const localeOptions = { maximumSignificantDigits: 3 }

  const yesVotes = Number(
    convertMicroDenomToDenomWithDecimals(proposal.votes.yes, tokenDecimals)
  )
  const noVotes = Number(
    convertMicroDenomToDenomWithDecimals(proposal.votes.no, tokenDecimals)
  )
  const abstainVotes = Number(
    convertMicroDenomToDenomWithDecimals(proposal.votes.abstain, tokenDecimals)
  )

  const totalWeight = Number(
    convertMicroDenomToDenomWithDecimals(proposal.total_power, tokenDecimals)
  )

  const turnoutTotal = yesVotes + noVotes + abstainVotes
  const turnoutYesPercent = turnoutTotal ? (yesVotes / turnoutTotal) * 100 : 0
  const turnoutNoPercent = turnoutTotal ? (noVotes / turnoutTotal) * 100 : 0
  const turnoutAbstainPercent = turnoutTotal
    ? (abstainVotes / turnoutTotal) * 100
    : 0

  const turnoutPercent = (turnoutTotal / totalWeight) * 100
  const totalYesPercent = (yesVotes / totalWeight) * 100
  const totalNoPercent = (noVotes / totalWeight) * 100
  const totalAbstainPercent = (abstainVotes / totalWeight) * 100

  // When only abstain votes have been cast and there is no quorum,
  // align the abstain progress bar to the right to line up with Abstain
  // text.
  const onlyAbstain = yesVotes === 0 && noVotes === 0 && abstainVotes > 0

  const expiresInSeconds =
    proposal.expiration && 'at_time' in proposal.expiration
      ? expirationAtTimeToSecondsFromNow(proposal.expiration)
      : undefined

  const { threshold, quorum } = processThresholdData(proposal.threshold)

  const thresholdReached =
    !!threshold &&
    // All abstain fails, so we need at least 1 yes vote to reach threshold.
    yesVotes > 0 &&
    (threshold.value.majority
      ? // Majority
        yesVotes > ((quorum ? turnoutTotal : totalWeight) - abstainVotes) / 2
      : // Percent
        yesVotes >=
        ((quorum ? turnoutTotal : totalWeight) - abstainVotes) *
          (threshold.value.percent / 100))
  const quorumMet =
    !!quorum &&
    (quorum.value.majority
      ? // Majority
        turnoutTotal > totalWeight / 2
      : // Percent
        turnoutPercent >= quorum.value.percent)

  const helpfulStatusText =
    proposal.status === Status.Open && threshold && quorum
      ? thresholdReached && quorumMet
        ? 'If the current vote stands, this proposal will pass.'
        : !thresholdReached && quorumMet
        ? "If the current vote stands, this proposal will fail because insufficient 'Yes' votes have been cast."
        : thresholdReached && !quorumMet
        ? 'If the current vote stands, this proposal will fail due to a lack of voter participation.'
        : undefined
      : undefined

  return (
    <div className="flex flex-col gap-2 items-stretch">
      {helpfulStatusText && (
        <p className="-mt-4 mb-4 text-sm italic text-tertiary">
          {helpfulStatusText}
        </p>
      )}

      {threshold &&
        (quorum ? (
          <>
            <p className="mb-3 text-sm body-text">Ratio of votes</p>

            <div className="flex flex-row gap-4 items-center font-mono text-xs">
              {[
                <p key="yes" className="text-valid">
                  Yes{' '}
                  {turnoutYesPercent.toLocaleString(undefined, localeOptions)}%
                </p>,
                <p key="no" className="text-error">
                  No {turnoutNoPercent.toLocaleString(undefined, localeOptions)}
                  %
                </p>,
              ]
                .sort(() => yesVotes - noVotes)
                .map((elem, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0 && yesVotes !== noVotes ? 'flex-1' : ''
                    }
                  >
                    {elem}
                  </div>
                ))}
              <p
                className={`text-secondary ${
                  yesVotes === noVotes ? 'flex-1 text-right' : ''
                }`}
              >
                Abstain{' '}
                {turnoutAbstainPercent.toLocaleString(undefined, localeOptions)}
                %
              </p>
            </div>

            <div className="my-2">
              <Progress
                rows={[
                  {
                    thickness: 3,
                    data: [
                      ...[
                        {
                          value: Number(turnoutYesPercent),
                          color: 'rgb(var(--valid))',
                        },
                        {
                          value: Number(turnoutNoPercent),
                          color: 'rgb(var(--error))',
                        },
                      ].sort((a, b) => b.value - a.value),
                      {
                        value: Number(turnoutAbstainPercent),
                        // Secondary is dark with 80% opacity.
                        color: 'rgba(var(--dark), 0.8)',
                      },
                    ],
                  },
                ]}
                verticalBars={
                  threshold && [
                    {
                      value: threshold.value.majority
                        ? 50
                        : threshold.value.percent,
                      color: 'rgba(var(--dark), 0.5)',
                    },
                  ]
                }
              />
            </div>

            <div className="relative">
              <TriangleUp
                className="absolute -top-[22px]"
                color="rgb(var(--light))"
                height="36px"
                style={{
                  left:
                    !threshold.value.majority && threshold.value.percent < 10
                      ? '0'
                      : !threshold.value.majority &&
                        threshold.value.percent > 90
                      ? 'calc(100% - 32px)'
                      : `calc(${
                          threshold.value.majority
                            ? 50
                            : threshold.value.percent
                        }% - 17px)`,
                }}
                width="36px"
              />

              <Tooltip label="A proposal must attain this proportion of 'Yes' votes to pass.">
                <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full bg-light rounded-md">
                  <p className="text-sm text-tertiary">
                    Passing threshold:{' '}
                    <span className="font-mono">{threshold.display}</span>
                  </p>

                  <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                    {thresholdReached ? (
                      <>
                        Passing{' '}
                        <CheckIcon
                          className="inline w-4"
                          color="rgb(var(--valid))"
                        />
                      </>
                    ) : (
                      <>
                        Failing{' '}
                        <XIcon
                          className="inline w-4"
                          color="rgb(var(--error))"
                        />
                      </>
                    )}
                  </p>
                </div>
              </Tooltip>
            </div>

            <div className="flex flex-row justify-between mt-4 mb-1">
              <p className="overflow-hidden text-sm text-ellipsis body-text">
                Turnout
              </p>

              <p className="font-mono text-xs text-tertiary">
                {turnoutPercent.toLocaleString(undefined, localeOptions)}%
              </p>
            </div>

            <div className="my-2">
              <Progress
                rows={[
                  {
                    thickness: 3,
                    data: [
                      {
                        value: turnoutPercent,
                        color: 'rgb(var(--dark))',
                      },
                    ],
                  },
                ]}
                verticalBars={[
                  {
                    value: quorum.value.majority ? 50 : quorum.value.percent,
                    color: 'rgba(var(--dark), 0.5)',
                  },
                ]}
              />
            </div>

            <div className="relative">
              <TriangleUp
                className="absolute -top-[22px]"
                color="rgb(var(--light))"
                height="36px"
                style={{
                  left:
                    !quorum.value.majority && quorum.value.percent < 10
                      ? '0'
                      : !quorum.value.majority && quorum.value.percent > 90
                      ? 'calc(100% - 32px)'
                      : `calc(${
                          quorum.value.majority ? 50 : quorum.value.percent
                        }% - 17px)`,
                }}
                width="36px"
              />

              <Tooltip label="This proportion of voting weight must vote on a proposal for it to pass.">
                <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full bg-light rounded-md">
                  <p className="text-sm text-tertiary">
                    Quorum: <span className="font-mono">{quorum.display}</span>
                  </p>

                  <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                    {quorumMet ? (
                      <>
                        Reached{' '}
                        <CheckIcon
                          className="inline w-4"
                          color="rgb(var(--valid))"
                        />
                      </>
                    ) : (
                      <>
                        Not met{' '}
                        <XIcon
                          className="inline w-4"
                          color="rgb(var(--error))"
                        />
                      </>
                    )}
                  </p>
                </div>
              </Tooltip>
            </div>
          </>
        ) : (
          <>
            <p className="overflow-hidden mb-3 text-sm text-ellipsis body-text">
              Turnout
            </p>

            <div className="flex flex-row gap-4 items-center font-mono text-xs">
              {[
                <p key="yes" className="text-valid">
                  Yes {totalYesPercent.toLocaleString(undefined, localeOptions)}
                  %
                </p>,
                <p key="no" className="text-error">
                  No {totalNoPercent.toLocaleString(undefined, localeOptions)}%
                </p>,
              ]
                .sort(() => yesVotes - noVotes)
                .map((elem, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0 && yesVotes !== noVotes ? 'flex-1' : ''
                    }
                  >
                    {elem}
                  </div>
                ))}
              <p
                className={`text-secondary ${
                  yesVotes === noVotes ? 'flex-1 text-right' : ''
                }`}
              >
                Abstain{' '}
                {totalAbstainPercent.toLocaleString(undefined, localeOptions)}%
              </p>
            </div>

            <div className="my-2">
              <Progress
                alignEnd={onlyAbstain}
                rows={[
                  {
                    thickness: 3,
                    data: [
                      ...[
                        {
                          value: Number(totalYesPercent),
                          color: 'rgb(var(--valid))',
                        },
                        {
                          value: Number(totalNoPercent),
                          color: 'rgb(var(--error))',
                        },
                      ].sort((a, b) => b.value - a.value),
                      {
                        value: Number(totalAbstainPercent),
                        // Secondary is dark with 80% opacity.
                        color: 'rgba(var(--dark), 0.8)',
                      },
                    ],
                  },
                ]}
                verticalBars={[
                  {
                    value: threshold.value.majority
                      ? 50
                      : threshold.value.percent,
                    color: 'rgba(var(--dark), 0.5)',
                  },
                ]}
              />
            </div>

            <div className="relative">
              <TriangleUp
                className="absolute -top-[22px]"
                color="rgb(var(--light))"
                height="36px"
                style={{
                  left:
                    !threshold.value.majority && threshold.value.percent < 10
                      ? '0'
                      : !threshold.value.majority &&
                        threshold.value.percent > 90
                      ? 'calc(100% - 32px)'
                      : `calc(${
                          threshold.value.majority
                            ? 50
                            : threshold.value.percent
                        }% - 17px)`,
                }}
                width="36px"
              />

              <Tooltip label="A proposal must attain this proportion of 'Yes' votes to pass.">
                <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full bg-light rounded-md">
                  <p className="text-sm text-tertiary">
                    Passing threshold:{' '}
                    <span className="font-mono">{threshold.display}</span>
                  </p>

                  <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                    {thresholdReached ? (
                      <>
                        Reached{' '}
                        <CheckIcon
                          className="inline w-4"
                          color="rgb(var(--valid))"
                        />
                      </>
                    ) : (
                      <>
                        Not met{' '}
                        <XIcon
                          className="inline w-4"
                          color="rgb(var(--error))"
                        />
                      </>
                    )}
                  </p>
                </div>
              </Tooltip>
            </div>
          </>
        ))}

      {proposal.status === Status.Open &&
        expiresInSeconds !== undefined &&
        expiresInSeconds > 0 && (
          <>
            <p className="overflow-hidden mt-4 font-mono text-sm text-tertiary text-ellipsis">
              Time left
            </p>

            <p className="font-mono text-xs text-right text-dark">
              {secondsToWdhms(expiresInSeconds, 2)}
            </p>

            {maxVotingSeconds !== undefined && (
              <div className="mt-1">
                <Progress
                  alignEnd
                  rows={[
                    {
                      thickness: 3,
                      data: [
                        {
                          value: (expiresInSeconds / maxVotingSeconds) * 100,
                          color: 'rgb(var(--dark))',
                        },
                      ],
                    },
                  ]}
                />
              </div>
            )}
          </>
        )}

      {/* Provide clarification for what happens in the event of a tie
       * when the threshold is exactly 50%.
       */}
      {!!threshold &&
        !threshold.value.majority &&
        threshold.value.percent === 50 &&
        turnoutTotal > 0 &&
        yesVotes === noVotes && (
          <div className="mt-4 text-sm">
            <p className="font-mono text-tertiary">Tie clarification</p>

            <p className="mt-2 body-text">{"'Yes' will win a tie vote."}</p>
          </div>
        )}

      {turnoutTotal > 0 && abstainVotes === turnoutTotal && (
        <div className="mt-4 text-sm">
          <p className="font-mono text-tertiary">All abstain clarification</p>

          <p className="mt-2 body-text">
            When all abstain, a proposal will fail.
          </p>
        </div>
      )}
    </div>
  )
}
