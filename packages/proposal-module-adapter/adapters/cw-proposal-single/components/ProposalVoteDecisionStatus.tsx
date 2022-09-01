import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { TriangleUp } from '@dao-dao/icons'
import { CwProposalSingleSelectors } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { Progress, Tooltip } from '@dao-dao/ui'
import {
  ProcessedTQType,
  convertMicroDenomToDenomWithDecimals,
  expirationAtTimeToSecondsFromNow,
  formatPercentOf100,
  secondsToWdhms,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { BaseProposalVoteDecisionStatusProps } from '../../../types'
import { useProposalProcessedTQ } from '../hooks'

export const ProposalVoteDecisionStatus = ({
  voteConversionDecimals,
}: BaseProposalVoteDecisionStatusProps) => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const config = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: proposalModuleAddress,
    })
  )
  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const yesVotes = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.votes.yes,
      voteConversionDecimals
    )
  )
  const noVotes = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.votes.no,
      voteConversionDecimals
    )
  )
  const abstainVotes = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.votes.abstain,
      voteConversionDecimals
    )
  )

  const totalWeight = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.total_power,
      voteConversionDecimals
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

  // When only abstain votes have been cast and there is no quorum,
  // align the abstain progress bar to the right to line up with Abstain
  // text.
  const onlyAbstain = yesVotes === 0 && noVotes === 0 && abstainVotes > 0

  const expiresInSeconds =
    proposal.expiration && 'at_time' in proposal.expiration
      ? expirationAtTimeToSecondsFromNow(proposal.expiration)
      : undefined

  const { threshold, quorum } = useProposalProcessedTQ()

  const thresholdReached =
    !!threshold &&
    // All abstain fails, so we need at least 1 yes vote to reach threshold.
    yesVotes > 0 &&
    (threshold.type === ProcessedTQType.Majority
      ? // Majority
        yesVotes > ((quorum ? turnoutTotal : totalWeight) - abstainVotes) / 2
      : // Percent
        yesVotes >=
        ((quorum ? turnoutTotal : totalWeight) - abstainVotes) *
          (threshold.value /
            (threshold.type === ProcessedTQType.Percent ? 100 : 1)))
  const quorumMet =
    !!quorum &&
    (quorum.type === ProcessedTQType.Majority
      ? // Majority
        turnoutTotal > totalWeight / 2
      : // Percent
        turnoutPercent >= quorum.value)

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

  // Convert various threshold types to a relevant percent to use in UI
  // elements.
  const effectiveThresholdValue =
    threshold.type === ProcessedTQType.Majority
      ? // If there are no abstain votes, this should be 50.
        // If there are 4% abstain votes, this should be 48, since 48%+1 of the 96% non-abstain votes need to be in favor.
        50 -
        (abstainVotes / 2 / ((quorum ? turnoutTotal : totalWeight) || 1)) * 100
      : threshold.type === ProcessedTQType.Percent
      ? threshold.value
      : // If absolute, compute percent of total.
        (threshold.value / totalWeight) * 100
  // Quorum does not have an absolute setting.
  const effectiveQuorumValue =
    quorum && (quorum.type === ProcessedTQType.Majority ? 50 : quorum.value)

  return (
    <div className="flex flex-col gap-2 items-stretch">
      {helpfulStatusText && (
        <p className="-mt-4 mb-4 text-sm italic text-tertiary">
          {helpfulStatusText}
        </p>
      )}

      {threshold &&
        (quorum && effectiveQuorumValue !== undefined ? (
          <>
            <p className="mb-3 text-sm body-text">{t('title.ratioOfVotes')}</p>

            <div className="flex flex-row gap-4 items-center font-mono text-xs">
              {[
                <p key="yes" className="text-valid">
                  {t('info.yesVote')} {formatPercentOf100(turnoutYesPercent)}
                </p>,
                <p key="no" className="text-error">
                  {t('info.noVote')} {formatPercentOf100(turnoutNoPercent)}
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
                {t('info.abstainVote')}{' '}
                {formatPercentOf100(turnoutAbstainPercent)}
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
                verticalBars={[
                  {
                    value: effectiveThresholdValue,
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
                    effectiveThresholdValue < 10
                      ? '0'
                      : effectiveThresholdValue > 90
                      ? 'calc(100% - 32px)'
                      : `calc(${effectiveThresholdValue}% - 17px)`,
                }}
                width="36px"
              />

              <Tooltip label={t('info.proposalThresholdTooltip')}>
                <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full rounded-md bg-light">
                  <p className="text-sm text-tertiary">
                    {t('title.passingThreshold')}:{' '}
                    <span className="font-mono">{threshold.display}</span>
                  </p>

                  <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                    {thresholdReached ? (
                      <>
                        {t('info.passing')}{' '}
                        <CheckIcon
                          className="inline w-4"
                          color="rgb(var(--valid))"
                        />
                      </>
                    ) : (
                      <>
                        {t('info.failing')}{' '}
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
                {t('title.turnout')}
              </p>

              <p className="font-mono text-xs text-tertiary">
                {formatPercentOf100(turnoutPercent)}
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
                    value: effectiveQuorumValue,
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
                    effectiveQuorumValue < 10
                      ? '0'
                      : effectiveQuorumValue > 90
                      ? 'calc(100% - 32px)'
                      : `calc(${effectiveQuorumValue}% - 17px)`,
                }}
                width="36px"
              />

              <Tooltip label={t('info.proposalQuorumTooltip')}>
                <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full rounded-md bg-light">
                  <p className="text-sm text-tertiary">
                    {t('title.quorum')}:{' '}
                    <span className="font-mono">{quorum.display}</span>
                  </p>

                  <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                    {quorumMet ? (
                      <>
                        {t('info.reached')}{' '}
                        <CheckIcon
                          className="inline w-4"
                          color="rgb(var(--valid))"
                        />
                      </>
                    ) : (
                      <>
                        {t('info.notMet')}{' '}
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
              {t('title.turnout')}
            </p>

            <div className="flex flex-row gap-4 items-center font-mono text-xs">
              {[
                <p key="yes" className="text-valid">
                  {t('info.yesVote')} {formatPercentOf100(totalYesPercent)}
                </p>,
                <p key="no" className="text-error">
                  {t('info.noVote')} {formatPercentOf100(totalNoPercent)}
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
                {t('info.abstainVote')}{' '}
                {formatPercentOf100(totalAbstainPercent)}
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
                    value: effectiveThresholdValue,
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
                    effectiveThresholdValue < 10
                      ? '0'
                      : effectiveThresholdValue > 90
                      ? 'calc(100% - 32px)'
                      : `calc(${effectiveThresholdValue}% - 17px)`,
                }}
                width="36px"
              />

              <Tooltip label={t('info.proposalThresholdTooltip')}>
                <div className="flex flex-row gap-2 justify-between items-center py-3 px-4 w-full rounded-md bg-light">
                  <p className="text-sm text-tertiary">
                    {t('title.passingThreshold')}:{' '}
                    <span className="font-mono">{threshold.display}</span>
                  </p>

                  <p className="flex flex-row gap-2 items-center font-mono text-xs text-tertiary">
                    {thresholdReached ? (
                      <>
                        {t('info.reached')}{' '}
                        <CheckIcon
                          className="inline w-4"
                          color="rgb(var(--valid))"
                        />
                      </>
                    ) : (
                      <>
                        {t('info.notMet')}{' '}
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
            <p className="overflow-hidden mt-4 font-mono text-sm text-ellipsis text-tertiary">
              {t('title.timeLeft')}
            </p>

            <p className="font-mono text-xs text-right text-dark">
              {secondsToWdhms(expiresInSeconds, 2)}
            </p>

            {'time' in config.max_voting_period &&
              config.max_voting_period.time > 0 && (
                <div className="mt-1">
                  <Progress
                    alignEnd
                    rows={[
                      {
                        thickness: 3,
                        data: [
                          {
                            value:
                              (expiresInSeconds /
                                config.max_voting_period.time) *
                              100,
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
        // effectiveThresholdValue is set to 50 when the type is majority,
        // but there are no ties in the majority case, so we can ignore it.
        threshold.type !== ProcessedTQType.Majority &&
        effectiveThresholdValue === 50 &&
        turnoutTotal > 0 &&
        yesVotes === noVotes && (
          <div className="mt-4 text-sm">
            <p className="font-mono text-tertiary">
              {t('title.proposalTieClarification')}
            </p>

            <p className="mt-2 body-text">
              {t('info.yesWillWinTieClarification')}
            </p>
          </div>
        )}

      {turnoutTotal > 0 && abstainVotes === turnoutTotal && (
        <div className="mt-4 text-sm">
          <p className="font-mono text-tertiary">
            {t('title.proposalAllAbstain')}
          </p>

          <p className="mt-2 body-text">
            {t('info.proposalAllAbstainClarification')}
          </p>
        </div>
      )}
    </div>
  )
}
