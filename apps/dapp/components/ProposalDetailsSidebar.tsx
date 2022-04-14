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
      <h2 className="font-medium mb-6">Details</h2>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-center">
        <p className="text-tertiary font-mono text-sm text-ellipsis overflow-hidden text-right">
          Proposal
        </p>
        <p className="col-span-2 font-mono text-sm">
          # {proposal.id.toString().padStart(6, '0')}
        </p>
        <p className="text-tertiary font-mono text-sm text-ellipsis overflow-hidden text-right">
          Status
        </p>
        <div className="col-span-2 text-sm">
          <ProposalStatus status={proposal.status} />
        </div>
        <p className="text-tertiary font-mono text-sm text-ellipsis overflow-hidden text-right">
          Proposer
        </p>
        <p className="col-span-2">
          <CopyToClipboard value={proposal.proposer} />
        </p>
        {proposal.status === 'executed' &&
        proposalExecutionTXHashState === 'loading' ? (
          <>
            <p className="text-tertiary font-mono text-sm text-right">TX</p>
            <p className="col-span-2">Loading...</p>
          </>
        ) : !!proposalExecutionTXHash ? (
          <>
            {CHAIN_TXN_URL_PREFIX ? (
              <a
                className="text-tertiary font-mono text-sm flex flex-row items-center gap-1 text-right"
                target="_blank"
                rel="noopener noreferrer"
                href={CHAIN_TXN_URL_PREFIX + proposalExecutionTXHash}
              >
                TX
                <ExternalLinkIcon width={16} />
              </a>
            ) : (
              <p className="text-tertiary font-mono text-sm text-right">TX</p>
            )}
            <p className="col-span-2">
              <CopyToClipboard value={proposalExecutionTXHash} />
            </p>
          </>
        ) : null}
        {memberWhenProposalCreated && (
          <>
            <p className="text-tertiary text-sm font-mono text-ellipsis overflow-hidden text-right">
              Your vote
            </p>

            {walletVote === WalletVote.Yes ? (
              <p className="col-span-2 text-valid text-sm font-mono flex items-center gap-1">
                <CheckIcon className="inline w-4" /> Yes
              </p>
            ) : walletVote === WalletVote.No ? (
              <p className="col-span-2 text-error text-sm font-mono flex items-center gap-1">
                <XIcon className="inline w-4" /> No
              </p>
            ) : walletVote === WalletVote.Abstain ? (
              <p className="col-span-2 text-secondary text-sm font-mono flex items-center gap-1">
                <SvgAbstain fill="currentColor" /> Abstain
              </p>
            ) : walletVote === WalletVote.Veto ? (
              <p className="col-span-2 text-error text-sm font-mono flex items-center gap-1">
                <XIcon className="inline w-4" /> Veto
              </p>
            ) : walletVote ? (
              <p className="col-span-2 text-secondary text-sm font-mono break-all">
                Unknown: {walletVote}
              </p>
            ) : (
              <p className="col-span-2 text-tertiary text-sm font-mono">
                {proposal.status === 'open' ? 'Pending...' : 'None'}
              </p>
            )}
          </>
        )}
      </div>

      <div>
        <h3 className="font-medium mt-8 mb-6">Referendum status</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {threshold ? (
          quorum ? (
            <>
              <p className="col-span-3 text-sm body-text text-ellipsis overflow-hidden mb-3">
                Ratio of votes
              </p>

              <div className="col-span-3 text-xs font-mono flex flex-row items-center gap-4">
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
                  className={`text-dark ${
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
                          color: 'rgb(var(--dark))',
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

              <div className="col-span-3 relative">
                <TriangleUp
                  className="absolute -top-[22px]"
                  color="rgb(var(--light))"
                  width="36px"
                  height="36px"
                  style={{
                    left:
                      threshold.percent < 10
                        ? '0'
                        : threshold.percent > 90
                        ? 'calc(100% - 32px)'
                        : `calc(${threshold.percent}% - 17px)`,
                  }}
                />

                <Tooltip label={PASSING_THRESHOLD_TOOLTIP}>
                  <div className="bg-light rounded-md px-4 py-3 flex flex-row justify-between items-center w-full gap-2">
                    <p className="text-tertiary text-sm">
                      Passing threshold:{' '}
                      <span className="font-mono">{threshold.display}</span>
                    </p>

                    <p className="text-tertiary text-xs font-mono flex flex-row items-center gap-2">
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

              <div className="col-span-3 flex flex-row justify-between mt-4 mb-1">
                <p className="text-sm body-text text-ellipsis overflow-hidden">
                  Turnout
                </p>

                <p className="text-tertiary text-xs font-mono">
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

              <div className="col-span-3 relative">
                <TriangleUp
                  className="absolute -top-[22px]"
                  color="rgb(var(--light))"
                  width="36px"
                  height="36px"
                  style={{
                    left:
                      quorum.percent < 10
                        ? '0'
                        : quorum.percent > 90
                        ? 'calc(100% - 32px)'
                        : `calc(${quorum.percent}% - 17px)`,
                  }}
                />

                <Tooltip label={QUORUM_TOOLTIP}>
                  <div className="bg-light rounded-md px-4 py-3 flex flex-row justify-between items-center w-full gap-2">
                    <p className="text-tertiary text-sm">
                      Quorum:{' '}
                      <span className="font-mono">{quorum.display}</span>
                    </p>

                    <p className="text-tertiary text-xs font-mono flex flex-row items-center gap-2">
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
              <p className="col-span-3 text-sm body-text text-ellipsis overflow-hidden mb-3">
                Turnout
              </p>

              <div className="col-span-3 text-xs font-mono flex flex-row items-center gap-4">
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
                  className={`text-dark ${
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
                          color: 'rgb(var(--dark))',
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

              <div className="col-span-3 relative">
                <TriangleUp
                  className="absolute -top-[22px]"
                  color="rgb(var(--light))"
                  width="36px"
                  height="36px"
                  style={{
                    left:
                      threshold.percent < 10
                        ? '0'
                        : threshold.percent > 90
                        ? 'calc(100% - 32px)'
                        : `calc(${threshold.percent}% - 17px)`,
                  }}
                />

                <Tooltip label={PASSING_THRESHOLD_TOOLTIP}>
                  <div className="bg-light rounded-md px-4 py-3 flex flex-row justify-between items-center w-full gap-2">
                    <p className="text-tertiary text-sm">
                      Passing threshold:{' '}
                      <span className="font-mono">{threshold.display}</span>
                    </p>

                    <p className="text-tertiary text-xs font-mono flex flex-row items-center gap-2">
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
            <p className="col-span-3 text-tertiary text-sm font-mono text-ellipsis overflow-hidden mt-4">
              Time left
            </p>

            <p className="col-span-3 text-dark text-xs font-mono text-right">
              {secondsToWdhms(expiresInSeconds, 2)}
            </p>

            {maxVotingSeconds !== undefined && (
              <div className="col-span-3 mt-1">
                <Progress
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
                  alignEnd
                />
              </div>
            )}
          </>
        )}

        {threshold?.percent === 50 && yesVotes === noVotes && (
          <div className="col-span-3 mt-4 text-sm">
            <p className="text-tertiary font-mono">Tie clarification</p>

            <p className="mt-2 body-text">{"'Yes' will win a tie vote."}</p>
          </div>
        )}

        {abstainVotes === turnoutTotal && (
          <div className="col-span-3 mt-4 text-sm">
            <p className="text-tertiary font-mono">All abstain clarification</p>

            <p className="mt-2 body-text">
              When all abstain, a proposal will fail.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
