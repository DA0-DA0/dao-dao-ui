import {
  ArrowOutwardRounded,
  Block,
  Check,
  Close,
  Texture,
} from '@mui/icons-material'
import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { Proposal as GovProposal } from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  BallotDepositEmoji,
  FormSwitchCard,
  IconButtonLink,
  InputErrorMessage,
  MarkdownPreview,
  ProposalVoteButton,
  SelectInput,
} from '@dao-dao/stateless'
import { ProposalVoteOption } from '@dao-dao/types'
import {
  ActionComponent,
  ActionOptionsContextType,
} from '@dao-dao/types/actions'
import { CHAIN_GOV_PROPOSAL_URL_TEMPLATE } from '@dao-dao/utils'

import { useActionOptions } from '../react'
import { ActionCard } from './ActionCard'

export interface GovernanceVoteOptions {
  proposals: GovProposal[]
  canVoteAsValidator: boolean
}

export interface GovernanceVoteData {
  voteAsValidator: boolean
  proposalId: string
  vote?: VoteOption
}

export const GovernanceVoteComponent: ActionComponent<
  GovernanceVoteOptions
> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { proposals, canVoteAsValidator },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext<GovernanceVoteData>()
  const { context } = useActionOptions()

  const voteAsValidator = watch(
    (fieldNamePrefix + 'voteAsValidator') as 'voteAsValidator'
  )
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
  const voteSelected = vote && voteOptions.find((v) => v.value === vote)

  return (
    <ActionCard
      Icon={BallotDepositEmoji}
      onRemove={onRemove}
      title={t('title.voteOnGovernanceProposal')}
    >
      {isCreating && (
        <SelectInput
          containerClassName="mb-4"
          fieldName={(fieldNamePrefix + 'proposalId') as 'proposalId'}
          register={register}
        >
          {proposals.map((proposal) => (
            <option
              key={proposal.proposalId.toString()}
              value={proposal.proposalId.toString()}
            >
              #{proposal.proposalId.toString()}
              {!!proposal.content &&
                'title' in proposal.content &&
                typeof proposal.content.title === 'string' &&
                ' ' + proposal.content.title}
            </option>
          ))}
        </SelectInput>
      )}

      {canVoteAsValidator && (
        <FormSwitchCard
          containerClassName="self-start"
          fieldName={(fieldNamePrefix + 'voteAsValidator') as 'voteAsValidator'}
          label={t('form.voteAsValidator')}
          setValue={setValue}
          tooltip={t('form.voteAsValidatorTooltip')}
          value={voteAsValidator}
        />
      )}

      {proposalSelected ? (
        <div className="space-y-3">
          <div className="flex flex-row items-center gap-4">
            <p className="header-text">
              #{proposalId}{' '}
              {proposalSelected.content &&
              'title' in proposalSelected.content &&
              typeof proposalSelected.content.title === 'string'
                ? proposalSelected.content.title
                : t('title.noTitle')}
            </p>

            <IconButtonLink
              Icon={ArrowOutwardRounded}
              href={CHAIN_GOV_PROPOSAL_URL_TEMPLATE.replace('ID', proposalId)}
              variant="ghost"
            />
          </div>

          {proposalSelected.content &&
            'description' in proposalSelected.content &&
            typeof proposalSelected.content.description === 'string' && (
              <MarkdownPreview
                markdown={proposalSelected.content.description}
              />
            )}

          <div className="!mt-8 flex flex-col items-stretch gap-1">
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

          <InputErrorMessage error={errors?.vote} />
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
