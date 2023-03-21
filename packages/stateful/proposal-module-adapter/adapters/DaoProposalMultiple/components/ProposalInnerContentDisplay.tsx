import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader } from '@dao-dao/stateless'
import {
  ActionAndData,
  BaseProposalInnerContentDisplayProps,
  ProposalStatus,
  ProposalVoteOption,
} from '@dao-dao/types'
import {
  MultipleChoiceOptionType,
  MultipleChoiceProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import { decodeMessages } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterContext } from '../../../react'
import {
  useLoadingProposal,
  useLoadingVoteOptions,
  useLoadingVotesInfo,
} from '../hooks'
import { NewProposalForm, VotesInfo } from '../types'
import {
  MultipleChoiceOptionData,
  MultipleChoiceOptionViewer,
} from './ui/MultipleChoiceOptionViewer'
import { ProposalInnerContentDisplay as StatelessProposalInnerContentDisplay } from './ui/ProposalInnerContentDisplay'

export const ProposalInnerContentDisplay = (
  props: BaseProposalInnerContentDisplayProps<NewProposalForm>
) => {
  const loadingProposal = useLoadingProposal()
  const loadingVoteOptions = useLoadingVoteOptions()
  const loadingVotesInfo = useLoadingVotesInfo()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        loadingProposal.loading ||
        loadingVoteOptions.loading ||
        loadingVotesInfo.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingVoteOptions.loading &&
        !loadingVotesInfo.loading && (
          <InnerProposalInnerContentDisplay
            {...props}
            proposal={loadingProposal.data}
            voteOptions={loadingVoteOptions.data}
            votesInfo={loadingVotesInfo.data}
          />
        )}
    </SuspenseLoader>
  )
}

export const InnerProposalInnerContentDisplay = ({
  onDuplicate,
  duplicateLoading,
  availableActions,
  proposal,
  voteOptions,
  votesInfo: { winningChoice },
}: BaseProposalInnerContentDisplayProps<NewProposalForm> & {
  proposal: MultipleChoiceProposal
  voteOptions: ProposalVoteOption<MultipleChoiceVote>[]
  votesInfo: VotesInfo
}) => {
  const { t } = useTranslation()
  const { id: proposalModuleAdapterId } = useProposalModuleAdapterContext()

  const mappedDecodedMessages = useMemo(
    () => proposal.choices.map((choice) => decodeMessages(choice.msgs)),
    [proposal.choices]
  )

  // Map action data to each proposal choice.
  const optionsData = proposal.choices.map(
    (choice, index): MultipleChoiceOptionData => {
      const voteOption = voteOptions[index]
      const decodedMessages = mappedDecodedMessages[index]
      const actionData: ActionAndData[] = decodedMessages.map((message) => {
        const actionMatch = availableActions
          .map((action) => ({
            action,
            ...action.useDecodedCosmosMsg(message),
          }))
          .find(({ match }) => match)

        // There should always be a match since custom matches all. This should
        // never happen as long as the Custom action exists.
        if (!actionMatch?.match) {
          throw new Error(t('error.loadingData'))
        }
        return {
          action: actionMatch.action,
          data: actionMatch.data,
        }
      })

      return {
        choice,
        actionData,
        decodedMessages,
        voteOption,
      }
    }
  )

  const duplicate = () => {
    onDuplicate({
      id: proposalModuleAdapterId,
      data: {
        title: proposal.title,
        description: proposal.description,
        choices: optionsData
          .filter(
            ({ choice }) => choice.option_type !== MultipleChoiceOptionType.None
          )
          .map(({ choice, actionData }) => ({
            title: choice.title,
            description: choice.description,
            actionData: actionData.map(({ action: { key }, data }) => ({
              key,
              data,
            })),
          })),
      },
    })
  }

  return (
    <StatelessProposalInnerContentDisplay
      duplicate={duplicate}
      duplicateLoading={duplicateLoading}
      innerContentDisplay={
        <div>
          <p className="title-text mb-4">{t('title.voteOptions')}</p>

          {optionsData.map((data, index) => (
            <MultipleChoiceOptionViewer
              key={index}
              availableActions={availableActions}
              data={data}
              lastOption={index === optionsData.length - 1}
              winner={
                (proposal.status === ProposalStatus.Passed ||
                  proposal.status === ProposalStatus.Executed ||
                  proposal.status === ProposalStatus.ExecutionFailed) &&
                !!winningChoice
                  ? winningChoice.index === data.choice.index
                  : undefined
              }
            />
          ))}
        </div>
      }
    />
  )
}
