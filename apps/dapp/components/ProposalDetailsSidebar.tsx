import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { ExternalLinkIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import Tooltip from '@reach/tooltip'

import {
  proposalSelector,
  proposalTallySelector,
  proposalExecutionTXHashSelector,
  walletVoteSelector,
  proposalStartBlockSelector,
  votingPowerAtHeightSelector,
  WalletVote,
} from 'selectors/proposals'
import { CHAIN_TXN_URL_PREFIX } from 'util/constants'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import {
  convertMicroDenomToDenomWithDecimals,
  expirationAtTimeToSecondsFromNow,
  secondsToWdhms,
} from 'util/conversion'
import { useThresholdQuorum } from 'util/proposal'

import { CopyToClipboard } from './CopyToClipboard'
import SvgAbstain from './icons/Abstain'
import { TriangleUp } from './icons/TriangleUp'
import { Progress } from './Progress'
import { ProposalStatus } from './ProposalStatus'

const PASSING_THRESHOLD_TOOLTIP =
  "A proposal must attain this proportion of 'Yes' votes to pass."
const QUORUM_TOOLTIP =
  'This proportion of voting weight must vote for a proposal to pass.'

export function ProposalDetailsSidebar({
  contractAddress,
  proposalId,
  multisig,
}: {
  contractAddress: string
  proposalId: number
  multisig?: boolean
}) {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )
  const { state: proposalExecutionTXHashState, contents: txHashContents } =
    useRecoilValueLoadable(
      proposalExecutionTXHashSelector({ contractAddress, proposalId })
    )
  const proposalExecutionTXHash: string | null =
    proposalExecutionTXHashState === 'hasValue' ? txHashContents : null

  const sigConfig = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )
  const walletVote = useRecoilValue(
    walletVoteSelector({ contractAddress, proposalId })
  )

  const height = useRecoilValue(
    proposalStartBlockSelector({ proposalId, contractAddress })
  )
  const votingPower = useRecoilValue(
    votingPowerAtHeightSelector({
      contractAddress,
      multisig: !!multisig,
      height,
    })
  )
  const memberWhenProposalCreated = votingPower > 0

  const { threshold, quorum } = useThresholdQuorum(
    contractAddress,
    proposalId,
    !!multisig
  )

  const configWrapper = new ContractConfigWrapper(sigConfig)
  const tokenDecimals = configWrapper.gov_token_decimals

  const localeOptions = { maximumSignificantDigits: 3 }

  const yesVotes = Number(
    multisig
      ? proposalTally.votes.yes
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.votes.yes,
          tokenDecimals
        )
  )
  const noVotes = Number(
    multisig
      ? proposalTally.votes.no
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.votes.no,
          tokenDecimals
        )
  )
  const abstainVotes = Number(
    multisig
      ? proposalTally.votes.abstain
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.votes.abstain,
          tokenDecimals
        )
  )

  const totalWeight = Number(
    multisig
      ? proposalTally.total_weight
      : convertMicroDenomToDenomWithDecimals(
          proposalTally.total_weight,
          tokenDecimals
        )
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

  if (!proposal) {
    return <div>Error, no proposal</div>
  }

  const maxVotingSeconds =
    'time' in sigConfig.config.max_voting_period
      ? sigConfig.config.max_voting_period.time
      : undefined
  const expiresInSeconds =
    proposal.expires && 'at_time' in proposal.expires
      ? expirationAtTimeToSecondsFromNow(proposal.expires)
      : undefined

  return (
    <div>
      <h2 className="mb-6 text-base font-medium">Details</h2>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-center">
        <p className="overflow-hidden font-mono text-sm text-right text-tertiary text-ellipsis">
          Proposal
        </p>
        <p className="col-span-2 font-mono text-sm">
          # {proposal.id.toString().padStart(6, '0')}
        </p>
        <p className="overflow-hidden font-mono text-sm text-right text-tertiary text-ellipsis">
          Status
        </p>
        <div className="col-span-2 text-sm">
          <ProposalStatus status={proposal.status} />
        </div>
        <p className="overflow-hidden font-mono text-sm text-right text-tertiary text-ellipsis">
          Proposer
        </p>
        <p className="col-span-2">
          <CopyToClipboard value={proposal.proposer} />
        </p>
        {proposal.status === 'executed' &&
        proposalExecutionTXHashState === 'loading' ? (
          <>
            <p className="font-mono text-sm text-right text-tertiary">TX</p>
            <p className="col-span-2">Loading...</p>
          </>
        ) : !!proposalExecutionTXHash ? (
          <>
            {CHAIN_TXN_URL_PREFIX ? (
              <a
                className="flex flex-row gap-1 items-center font-mono text-sm text-right text-tertiary"
                href={CHAIN_TXN_URL_PREFIX + proposalExecutionTXHash}
                rel="noopener noreferrer"
                target="_blank"
              >
                TX
                <ExternalLinkIcon width={16} />
              </a>
            ) : (
              <p className="font-mono text-sm text-right text-tertiary">TX</p>
            )}
            <p className="col-span-2">
              <CopyToClipboard value={proposalExecutionTXHash} />
            </p>
          </>
        ) : null}
        {memberWhenProposalCreated && (
          <>
            <p className="overflow-hidden font-mono text-sm text-right text-tertiary text-ellipsis">
              Your vote
            </p>

            {walletVote === WalletVote.Yes ? (
              <p className="flex col-span-2 gap-1 items-center font-mono text-sm text-valid">
                <CheckIcon className="inline w-4" /> Yes
              </p>
            ) : walletVote === WalletVote.No ? (
              <p className="flex col-span-2 gap-1 items-center font-mono text-sm text-error">
                <XIcon className="inline w-4" /> No
              </p>
            ) : walletVote === WalletVote.Abstain ? (
              <p className="flex col-span-2 gap-1 items-center font-mono text-sm text-secondary">
                <SvgAbstain fill="currentColor" /> Abstain
              </p>
            ) : walletVote === WalletVote.Veto ? (
              <p className="flex col-span-2 gap-1 items-center font-mono text-sm text-error">
                <XIcon className="inline w-4" /> Veto
              </p>
            ) : walletVote ? (
              <p className="col-span-2 font-mono text-sm text-secondary break-all">
                Unknown: {walletVote}
              </p>
            ) : (
              <p className="col-span-2 font-mono text-sm text-tertiary">
                {proposal.status === 'open' ? 'Pending...' : 'None'}
              </p>
            )}
          </>
        )}
      </div>

      <h3 className="mt-8 mb-6 text-base font-medium">Referendum status</h3>

      <div className="grid grid-cols-3 gap-2">
        {threshold ? (
          quorum ? (
            <>
              <p className="overflow-hidden col-span-3 mb-3 text-sm text-ellipsis body-text">
                Ratio of votes
              </p>

              <div className="flex flex-row col-span-3 gap-4 items-center font-mono text-xs">
                {[
                  <p key="yes" className="text-valid">
                    Yes{' '}
                    {turnoutYesPercent.toLocaleString(undefined, localeOptions)}
                    %
                  </p>,
                  <p key="no" className="text-error">
                    No{' '}
                    {turnoutNoPercent.toLocaleString(undefined, localeOptions)}%
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
                  {turnoutAbstainPercent.toLocaleString(
                    undefined,
                    localeOptions
                  )}
                  %
                </p>
              </div>

              <div className="col-span-3 my-2">
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
                        value: threshold.percent,
                        color: 'rgba(var(--dark), 0.5)',
                      },
                    ]
                  }
                />
              </div>

              <div className="relative col-span-3">
                <TriangleUp
                  className="absolute -top-[22px]"
                  color="rgb(var(--light))"
                  height="36px"
                  style={{
                    left:
                      threshold.percent < 10
                        ? '0'
                        : threshold.percent > 90
                        ? 'calc(100% - 32px)'
                        : `calc(${threshold.percent}% - 17px)`,
                  }}
                  width="36px"
                />

                <Tooltip label={PASSING_THRESHOLD_TOOLTIP}>
                  <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full bg-light rounded-md">
                    <p className="text-sm text-tertiary">
                      Passing threshold:{' '}
                      <span className="font-mono">{threshold.display}</span>
                    </p>

                    <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                      {turnoutYesPercent >= threshold.percent ? (
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

              <div className="flex flex-row col-span-3 justify-between mt-4 mb-1">
                <p className="overflow-hidden text-sm text-ellipsis body-text">
                  Turnout
                </p>

                <p className="font-mono text-xs text-tertiary">
                  {turnoutPercent.toLocaleString(undefined, localeOptions)}%
                </p>
              </div>

              <div className="col-span-3 my-2">
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
                      value: quorum.percent,
                      color: 'rgba(var(--dark), 0.5)',
                    },
                  ]}
                />
              </div>

              <div className="relative col-span-3">
                <TriangleUp
                  className="absolute -top-[22px]"
                  color="rgb(var(--light))"
                  height="36px"
                  style={{
                    left:
                      quorum.percent < 10
                        ? '0'
                        : quorum.percent > 90
                        ? 'calc(100% - 32px)'
                        : `calc(${quorum.percent}% - 17px)`,
                  }}
                  width="36px"
                />

                <Tooltip label={QUORUM_TOOLTIP}>
                  <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full bg-light rounded-md">
                    <p className="text-sm text-tertiary">
                      Quorum:{' '}
                      <span className="font-mono">{quorum.display}</span>
                    </p>

                    <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                      {turnoutPercent >= quorum.percent ? (
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
              <p className="overflow-hidden col-span-3 mb-3 text-sm text-ellipsis body-text">
                Turnout
              </p>

              <div className="flex flex-row col-span-3 gap-4 items-center font-mono text-xs">
                {[
                  <p key="yes" className="text-valid">
                    Yes{' '}
                    {totalYesPercent.toLocaleString(undefined, localeOptions)}%
                  </p>,
                  <p key="no" className="text-error">
                    No {totalNoPercent.toLocaleString(undefined, localeOptions)}
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
                  {totalAbstainPercent.toLocaleString(undefined, localeOptions)}
                  %
                </p>
              </div>

              <div className="col-span-3 my-2">
                <Progress
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
                      value: threshold.percent,
                      color: 'rgba(var(--dark), 0.5)',
                    },
                  ]}
                />
              </div>

              <div className="relative col-span-3">
                <TriangleUp
                  className="absolute -top-[22px]"
                  color="rgb(var(--light))"
                  height="36px"
                  style={{
                    left:
                      threshold.percent < 10
                        ? '0'
                        : threshold.percent > 90
                        ? 'calc(100% - 32px)'
                        : `calc(${threshold.percent}% - 17px)`,
                  }}
                  width="36px"
                />

                <Tooltip label={PASSING_THRESHOLD_TOOLTIP}>
                  <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full bg-light rounded-md">
                    <p className="text-sm text-tertiary">
                      Passing threshold:{' '}
                      <span className="font-mono">{threshold.display}</span>
                    </p>

                    <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                      {totalYesPercent >= threshold.percent ? (
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
          )
        ) : null}

        {expiresInSeconds !== undefined && expiresInSeconds > 0 && (
          <>
            <p className="overflow-hidden col-span-3 mt-4 font-mono text-sm text-tertiary text-ellipsis">
              Time left
            </p>

            <p className="col-span-3 font-mono text-xs text-right text-dark">
              {secondsToWdhms(expiresInSeconds, 2)}
            </p>

            {maxVotingSeconds !== undefined && (
              <div className="col-span-3 mt-1">
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

        {threshold?.percent === 50 && yesVotes === noVotes && (
          <div className="col-span-3 mt-4 text-sm">
            <p className="font-mono text-tertiary">Tie clarification</p>

            <p className="mt-2 body-text">{"'Yes' will win a tie vote."}</p>
          </div>
        )}

        {abstainVotes === turnoutTotal && (
          <div className="col-span-3 mt-4 text-sm">
            <p className="font-mono text-tertiary">All abstain clarification</p>

            <p className="mt-2 body-text">
              When all abstain, a proposal will fail.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
