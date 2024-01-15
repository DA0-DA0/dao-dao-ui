import {
  Block,
  Check,
  CheckBoxOutlineBlankRounded,
  Close,
  Texture,
} from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  GovernanceProposalFromProposal,
  NoContent,
  ProposalVoteButton,
  SelectInput,
  TooltipInfoIcon,
} from '@dao-dao/stateless'
import {
  GovProposalActionDisplayProps,
  GovProposalWithDecodedContent,
  LoadingData,
  ProposalVoteOption,
  StatefulTokenAmountDisplayProps,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
} from '@dao-dao/types/actions'
import { formatPercentOf100, validateRequired } from '@dao-dao/utils'
import {
  VoteOption,
  WeightedVoteOption,
} from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { useActionOptions } from '../../../react'

export interface GovernanceVoteOptions {
  proposals: GovProposalWithDecodedContent[]
  existingVotesLoading?: LoadingData<WeightedVoteOption[] | undefined>
  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
  GovProposalActionDisplay: ComponentType<GovProposalActionDisplayProps>
}

export type GovernanceVoteData = {
  chainId: string
  proposalId: string
  vote: VoteOption
}

export const GovernanceVoteComponent: ActionComponent<
  GovernanceVoteOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    proposals,
    existingVotesLoading,
    TokenAmountDisplay,
    GovProposalActionDisplay,
  },
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<GovernanceVoteData>()

  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')
  const proposalSelected = proposals.find((p) => p.id.toString() === proposalId)

  return (
    <>
      {isCreating &&
        (proposals.length === 0 ? (
          <NoContent
            Icon={CheckBoxOutlineBlankRounded}
            body={t('info.noGovernanceProposalsOpenForVoting')}
            error
          />
        ) : (
          <SelectInput
            containerClassName="mb-4"
            error={errors?.proposalId}
            fieldName={(fieldNamePrefix + 'proposalId') as 'proposalId'}
            register={register}
            validation={[validateRequired]}
          >
            {proposals.map((proposal) => (
              <option
                key={proposal.id.toString()}
                value={proposal.id.toString()}
              >
                #{proposal.id.toString()}
                {' ' + proposal.title}
              </option>
            ))}
          </SelectInput>
        ))}

      {proposalSelected ? (
        <GovernanceProposalFromProposal
          GovProposalActionDisplay={GovProposalActionDisplay}
          TokenAmountDisplay={TokenAmountDisplay}
          proposal={proposalSelected}
        />
      ) : (
        // If not creating and no proposal selected, something went wrong.
        !isCreating && (
          <p className="text-text-interactive-error">
            {t('error.failedToFindGovernanceProposal', { id: proposalId })}
          </p>
        )
      )}

      {(!isCreating || proposals.length > 0) && (
        <div className="-mx-6 flex flex-col gap-2 border-t border-border-secondary p-6 pt-5">
          <VoteFooter
            existingVotesLoading={existingVotesLoading}
            fieldNamePrefix={fieldNamePrefix}
            isCreating={isCreating}
          />
        </div>
      )}
    </>
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
              context.type === ActionContextType.Dao
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
        !!existingVotesLoading.data?.length && (
          <div className="mt-4 space-y-2">
            <div className="flex flex-row items-center gap-2">
              <p className="primary-text text-text-secondary">
                {t('info.subjectsCurrentlyCastVote', {
                  subject:
                    context.type === ActionContextType.Dao
                      ? context.info.name
                      : t('info.your'),
                })}
              </p>

              <TooltipInfoIcon
                title={t('info.subjectsCurrentlyCastVoteTooltip', {
                  subject:
                    context.type === ActionContextType.Dao
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
                          {formatPercentOf100(Number(vote.weight) * 100)}
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
