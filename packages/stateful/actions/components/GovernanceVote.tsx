import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import {
  ArrowOutwardRounded,
  Block,
  Check,
  Close,
  HourglassTopRounded,
  RotateRightOutlined,
  Texture,
  TimelapseRounded,
  TimerRounded,
} from '@mui/icons-material'
import { ProposalStatus, VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { WeightedVoteOption } from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  BallotDepositEmoji,
  IconButtonLink,
  MarkdownRenderer,
  ProposalStatusAndInfo,
  ProposalStatusAndInfoProps,
  ProposalVoteButton,
  SelectInput,
  Tooltip,
  TooltipInfoIcon,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  GovProposalWithDecodedContent,
  LoadingData,
  ProposalVoteOption,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionComponentProps,
  ActionOptionsContextType,
} from '@dao-dao/types/actions'
import {
  CHAIN_GOV_PROPOSAL_URL_TEMPLATE,
  formatDateTimeTz,
  formatPercentOf100,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../react'
import { ActionCard } from './ActionCard'

export interface GovernanceVoteOptions {
  proposals: GovProposalWithDecodedContent[]
  existingVotesLoading?: LoadingData<WeightedVoteOption[] | undefined>
}

export interface GovernanceVoteData {
  proposalId: string
  vote: VoteOption
}

export const GovernanceVoteComponent: ActionComponent<
  GovernanceVoteOptions
> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { proposals, existingVotesLoading },
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<GovernanceVoteData>()

  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')

  const proposalSelected = proposals.find(
    (p) => p.proposalId.toString() === proposalId
  )

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: false })

  return (
    <ActionCard
      Icon={BallotDepositEmoji}
      footer={
        <VoteFooter
          existingVotesLoading={existingVotesLoading}
          fieldNamePrefix={fieldNamePrefix}
          isCreating={isCreating}
        />
      }
      onRemove={onRemove}
      title={t('title.voteOnGovernanceProposal')}
    >
      {isCreating && (
        <SelectInput
          containerClassName="mb-4"
          error={errors?.proposalId}
          fieldName={(fieldNamePrefix + 'proposalId') as 'proposalId'}
          register={register}
          validation={[validateRequired]}
        >
          {proposals.map((proposal) => (
            <option
              key={proposal.proposalId.toString()}
              value={proposal.proposalId.toString()}
            >
              #{proposal.proposalId.toString()}
              {!!proposal.decodedContent &&
                'title' in proposal.decodedContent &&
                typeof proposal.decodedContent.title === 'string' &&
                ' ' + proposal.decodedContent.title}
            </option>
          ))}
        </SelectInput>
      )}

      {proposalSelected ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            <p className="header-text">
              #{proposalId}{' '}
              {proposalSelected.decodedContent &&
              'title' in proposalSelected.decodedContent &&
              typeof proposalSelected.decodedContent.title === 'string'
                ? proposalSelected.decodedContent.title
                : t('title.noTitle')}
            </p>

            <IconButtonLink
              Icon={ArrowOutwardRounded}
              href={CHAIN_GOV_PROPOSAL_URL_TEMPLATE.replace('ID', proposalId)}
              variant="ghost"
            />
          </div>

          {proposalSelected.decodedContent && (
            <>
              <ProposalStatusAndInfo
                className="max-w-max"
                info={[
                  {
                    Icon: RotateRightOutlined,
                    label: t('title.status'),
                    Value: (props) => (
                      <p {...props}>
                        {t(
                          PROPOSAL_STATUS_I18N_KEY_MAP[proposalSelected.status]
                        )}
                      </p>
                    ),
                  },
                  {
                    Icon: TimelapseRounded,
                    label: t('title.votingOpened'),
                    Value: (props) => (
                      <p {...props}>
                        {formatDateTimeTz(proposalSelected.votingStartTime)}
                      </p>
                    ),
                  },
                  // If open for voting, show relative time until end.
                  ...(proposalSelected.status ===
                  ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
                    ? ([
                        {
                          Icon: HourglassTopRounded,
                          label: t('title.timeLeft'),
                          Value: (props) => (
                            <Tooltip
                              title={formatDateTimeTz(
                                proposalSelected.votingEndTime
                              )}
                            >
                              <p {...props}>
                                <TimeAgo
                                  date={proposalSelected.votingEndTime}
                                  formatter={timeAgoFormatter}
                                />
                              </p>
                            </Tooltip>
                          ),
                        },
                      ] as ProposalStatusAndInfoProps['info'])
                    : ([
                        {
                          Icon: TimerRounded,
                          label: t('title.votingClosed'),
                          Value: (props) => (
                            <p {...props}>
                              {formatDateTimeTz(proposalSelected.votingEndTime)}
                            </p>
                          ),
                        },
                      ] as ProposalStatusAndInfoProps['info'])),
                ]}
                inline
              />

              {'description' in proposalSelected.decodedContent &&
                typeof proposalSelected.decodedContent.description ===
                  'string' && (
                  <MarkdownRenderer
                    className="styled-scrollbar -mr-4 max-h-[40vh] overflow-y-auto pr-4"
                    markdown={proposalSelected.decodedContent.description.replace(
                      /\\n/g,
                      '\n'
                    )}
                  />
                )}
            </>
          )}
        </div>
      ) : (
        // If not creating and no proposal selected, something went wrong.
        !isCreating && (
          <p className="text-text-interactive-error">
            {t('error.failedToFindGovernanceProposal', { id: proposalId })}
          </p>
        )
      )}
    </ActionCard>
  )
}

const VoteFooter = ({
  fieldNamePrefix,
  isCreating,
  existingVotesLoading,
}: Pick<
  ActionComponentProps<GovernanceVoteOptions>,
  'fieldNamePrefix' | 'isCreating'
> & {
  existingVotesLoading: GovernanceVoteOptions['existingVotesLoading']
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { watch, setValue } = useFormContext<GovernanceVoteData>()

  const vote = watch((fieldNamePrefix + 'vote') as 'vote')

  const voteOptions: ProposalVoteOption<VoteOption>[] = [
    {
      Icon: Check,
      label: t('info.yesVote'),
      value: VoteOption.VOTE_OPTION_YES,
    },
    {
      Icon: Close,
      label: t('info.noVote'),
      value: VoteOption.VOTE_OPTION_NO,
    },
    {
      Icon: Block,
      label: t('info.noWithVeto'),
      value: VoteOption.VOTE_OPTION_NO_WITH_VETO,
    },
    {
      Icon: Texture,
      label: t('info.abstainVote'),
      value: VoteOption.VOTE_OPTION_ABSTAIN,
    },
  ]
  const voteOptionSelected = voteOptions.find((v) => v.value === vote)

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="primary-text text-text-secondary">
          {t('info.subjectsVote', {
            subject:
              context.type === ActionOptionsContextType.Dao
                ? context.info.name
                : t('info.your'),
          })}
        </p>

        {isCreating ? (
          <div className="flex flex-col items-stretch gap-1">
            {voteOptions.map((option) => (
              <ProposalVoteButton<VoteOption>
                key={option.value}
                disabled={!isCreating}
                onClick={() =>
                  setValue((fieldNamePrefix + 'vote') as 'vote', option.value)
                }
                option={option}
                pressed={option.value === vote}
              />
            ))}
          </div>
        ) : (
          voteOptionSelected && (
            <ProposalVoteButton<VoteOption>
              disabled
              option={voteOptionSelected}
            />
          )
        )}
      </div>

      {isCreating &&
        existingVotesLoading &&
        !existingVotesLoading.loading &&
        existingVotesLoading.data && (
          <div className="mt-4 space-y-2">
            <div className="flex flex-row items-center gap-2">
              <p className="primary-text text-text-secondary">
                {t('info.subjectsCurrentlyCastVote', {
                  subject:
                    context.type === ActionOptionsContextType.Dao
                      ? context.info.name
                      : t('info.your'),
                })}
              </p>

              <TooltipInfoIcon
                title={t('info.subjectsCurrentlyCastVoteTooltip', {
                  subject:
                    context.type === ActionOptionsContextType.Dao
                      ? context.info.name
                      : t('info.you'),
                })}
              />
            </div>

            <div className="space-y-1">
              {existingVotesLoading.data.map((vote) => {
                const voteOption = voteOptions.find(
                  ({ value }) => value === vote.option
                )
                return (
                  voteOption && (
                    <div className="flex flex-row items-center gap-1">
                      <ProposalVoteButton<VoteOption>
                        key={vote.option}
                        disabled
                        option={voteOption}
                      />

                      {/* You can cast weighted votes and vote on more than one option if you want, so this lists the weight for each one if there are more than one. Typically there will only be one, so no need to show 100% every time. */}
                      {existingVotesLoading.data!.length > 1 && (
                        <p className="text-text-secondary">
                          {formatPercentOf100(
                            decodeCosmosSdkDecFromProto(
                              vote.weight
                            ).toFloatApproximation() * 100
                          )}
                        </p>
                      )}
                    </div>
                  )
                )
              })}
            </div>
          </div>
        )}
    </>
  )
}

const PROPOSAL_STATUS_I18N_KEY_MAP: Record<ProposalStatus, string> = {
  [ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED]: 'govProposalStatus.unspecified',
  [ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD]:
    'govProposalStatus.depositPeriod',
  [ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD]:
    'govProposalStatus.votingPeriod',
  [ProposalStatus.PROPOSAL_STATUS_PASSED]: 'govProposalStatus.passed',
  [ProposalStatus.PROPOSAL_STATUS_REJECTED]: 'govProposalStatus.rejected',
  [ProposalStatus.PROPOSAL_STATUS_FAILED]: 'govProposalStatus.failed',
  [ProposalStatus.UNRECOGNIZED]: 'govProposalStatus.unrecognized',
}
