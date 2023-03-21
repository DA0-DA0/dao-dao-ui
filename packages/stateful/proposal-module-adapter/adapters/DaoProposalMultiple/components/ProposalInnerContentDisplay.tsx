import clsx from 'clsx'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CosmosMessageDisplay, Loader } from '@dao-dao/stateless'
import {
  ActionAndData,
  BaseProposalInnerContentDisplayProps,
  ProposalVoteOption,
} from '@dao-dao/types'
import {
  MultipleChoiceOptionType,
  MultipleChoiceProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import { decodeMessages } from '@dao-dao/utils'

import { ActionsRenderer } from '../../../../actions'
import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterContext } from '../../../react'
import { useLoadingProposal, useLoadingVoteOptions } from '../hooks'
import { NewProposalForm } from '../types'
import { ProposalInnerContentDisplay as StatelessProposalInnerContentDisplay } from './ui/ProposalInnerContentDisplay'

export const ProposalInnerContentDisplay = (
  props: BaseProposalInnerContentDisplayProps<NewProposalForm>
) => {
  const loadingProposal = useLoadingProposal()
  const loadingVoteOptions = useLoadingVoteOptions()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingProposal.loading || loadingVoteOptions.loading}
    >
      {!loadingProposal.loading && !loadingVoteOptions.loading && (
        <InnerProposalInnerContentDisplay
          {...props}
          proposal={loadingProposal.data}
          voteOptions={loadingVoteOptions.data}
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
}: BaseProposalInnerContentDisplayProps<NewProposalForm> & {
  proposal: MultipleChoiceProposal
  voteOptions: ProposalVoteOption<MultipleChoiceVote>[]
}) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)
  const { id: proposalModuleAdapterId } = useProposalModuleAdapterContext()

  const mappedDecodedMessages = useMemo(
    () => proposal.choices.map((choice) => decodeMessages(choice.msgs)),
    [proposal.choices]
  )

  // Map action data to each proposal choice.
  const mappedChoicesToActions = proposal.choices.map((choice, index) => {
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
      title: choice.title,
      description: choice.description,
      index: choice.index,
      actionData,
      decodedMessages,
      optionType: choice.option_type,
      voteOption,
    }
  })

  const duplicate = () => {
    onDuplicate({
      id: proposalModuleAdapterId,
      data: {
        title: proposal.title,
        description: proposal.description,
        choices: mappedChoicesToActions
          .map((choice) => ({
            ...choice,
            actionData: choice.actionData.map(({ action: { key }, data }) => ({
              key,
              data,
            })),
          }))
          .filter(
            (choice) => choice.optionType !== MultipleChoiceOptionType.None
          ),
      },
    })
  }

  const innerContentDisplay = (
    <div>
      <p className="primary-text pb-5 text-text-body">
        {t('title.voteOptions')}
      </p>

      {mappedChoicesToActions.map((choice, index) => (
        <div
          key={choice.index}
          className={clsx(
            'flex flex-col justify-between gap-6 py-4 px-6',
            // No bottom border on last item.
            index < mappedChoicesToActions.length - 1 &&
              'border-b border-border-secondary'
          )}
        >
          <div className="flex flex-row items-center">
            <choice.voteOption.Icon
              className="!h-4 !w-4"
              style={{
                color: choice.voteOption.color,
              }}
            />
            <p className="primary-text px-2 text-text-body">{choice.title}</p>
          </div>

          {choice.optionType !== MultipleChoiceOptionType.None && (
            <p className="secondary-text">{choice.description}</p>
          )}

          {showRaw ? (
            <CosmosMessageDisplay
              value={JSON.stringify(choice.decodedMessages, undefined, 2)}
            />
          ) : (
            <ActionsRenderer
              actionData={choice.actionData}
              availableActions={availableActions}
              onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
            />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <StatelessProposalInnerContentDisplay
      duplicate={duplicate}
      duplicateLoading={duplicateLoading}
      innerContentDisplay={innerContentDisplay}
      setShowRaw={setShowRaw}
      showRaw={showRaw}
    />
  )
}
