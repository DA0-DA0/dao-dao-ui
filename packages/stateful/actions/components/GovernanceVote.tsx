import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import {
  ArrowOutwardRounded,
  Block,
  Check,
  Close,
  Texture,
} from '@mui/icons-material'
import { ProposalStatus, VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { WeightedVoteOption } from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  BallotDepositEmoji,
  IconButtonLink,
  MarkdownPreview,
  ProposalVoteButton,
  SelectInput,
  TooltipInfoIcon,
} from '@dao-dao/stateless'
import {
  GovProposalWithDecodedContent,
  LoadingData,
  ProposalVoteOption,
} from '@dao-dao/types'
import {
  ActionComponent,
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
  const { register, setValue, watch } = useFormContext<GovernanceVoteData>()
  const { context } = useActionOptions()

  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')
  const vote = watch((fieldNamePrefix + 'vote') as 'vote')

  const proposalSelected = proposals.find(
    (p) => p.proposalId.toString() === proposalId
  )

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
  const voteSelected = voteOptions.find((v) => v.value === vote)

  return (
    <ActionCard
      Icon={BallotDepositEmoji}
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
              <div className="grid w-max grid-cols-[auto_1fr] gap-x-20 gap-y-2 rounded-md bg-background-tertiary p-6">
                <p className="primary-text">{t('title.status')}:</p>

                <p className="primary-text font-mono">
                  {t(PROPOSAL_STATUS_I18N_KEY_MAP[proposalSelected.status])}
                </p>

                <p className="primary-text">{t('title.votingStart')}:</p>

                <p className="primary-text font-mono">
                  {formatDateTimeTz(proposalSelected.votingStartTime)}
                </p>

                <p className="primary-text">{t('title.votingEnd')}:</p>

                <p className="primary-text font-mono">
                  {formatDateTimeTz(proposalSelected.votingEndTime)}
                </p>
              </div>

              {'description' in proposalSelected.decodedContent &&
                typeof proposalSelected.decodedContent.description ===
                  'string' && (
                  <MarkdownPreview
                    markdown={proposalSelected.decodedContent.description}
                  />
                )}
            </>
          )}

          <div className="flex flex-col items-stretch gap-1">
            {isCreating
              ? voteOptions.map((option) => (
                  <ProposalVoteButton<VoteOption>
                    key={option.value}
                    disabled={!isCreating}
                    onClick={() =>
                      setValue(
                        (fieldNamePrefix + 'vote') as 'vote',
                        option.value
                      )
                    }
                    option={option}
                    pressed={option.value === vote}
                  />
                ))
              : voteSelected && (
                  <div className="space-y-2">
                    <p className="primary-text text-text-secondary">
                      {t('info.subjectsVote', {
                        subject:
                          context.type === ActionOptionsContextType.Dao
                            ? context.info.name
                            : t('info.your'),
                      })}
                    </p>

                    <ProposalVoteButton<VoteOption>
                      disabled
                      option={voteSelected}
                    />
                  </div>
                )}
          </div>
        </div>
      ) : (
        // If not creating and no proposal selected, something went wrong.
        !isCreating && (
          <p className="text-text-interactive-error">
            {t('error.failedToFindGovernanceProposal', { id: proposalId })}
          </p>
        )
      )}

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
    </ActionCard>
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
