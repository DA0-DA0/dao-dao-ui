import CircleIcon from '@mui/icons-material/Circle'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CosmosMessageDisplay, Loader } from '@dao-dao/stateless'
import {
  ActionAndData,
  BaseProposalInnerContentDisplayProps,
} from '@dao-dao/types'
import {
  MultipleChoiceOptionType,
  MultipleChoiceProposal,
} from '@dao-dao/types/contracts/CwdProposalMultiple'
import { decodeMessages } from '@dao-dao/utils'

import { ActionsRenderer } from '../../../../actions'
import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterContext } from '../../../react'
import { useLoadingProposal } from '../hooks'
import { NewProposalForm } from '../types'
import { MULTIPLE_CHOICE_OPTION_COLORS } from './ui/MultipleChoiceOption'
import { ProposalInnerContentDisplay as StatelessProposalInnerContentDisplay } from './ui/ProposalInnerContentDisplay'

export const ProposalInnerContentDisplay = (
  props: BaseProposalInnerContentDisplayProps<NewProposalForm>
) => {
  const loadingProposal = useLoadingProposal()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerProposalInnerContentDisplay
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

export const InnerProposalInnerContentDisplay = ({
  onDuplicate,
  availableActions,
  proposal,
}: BaseProposalInnerContentDisplayProps<NewProposalForm> & {
  proposal: MultipleChoiceProposal
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

  const choiceDisplay = mappedChoicesToActions.map((choice) => {
    return (
      <div
        key={choice.title}
        className="flex flex-col justify-between gap-6 border-b border-border-secondary py-4 px-6"
      >
        <div className="flex flex-row items-center">
          <div>
            <CircleIcon
              className="!h-3 !w-3 align-middle"
              style={{
                color:
                  MULTIPLE_CHOICE_OPTION_COLORS[
                    choice.index % MULTIPLE_CHOICE_OPTION_COLORS.length
                  ],
              }}
            />
          </div>
          <p className="primary-text px-2 text-text-body">{choice.title}</p>
        </div>
        <p className="secondary-text">{choice.description}</p>

        {showRaw ? (
          <CosmosMessageDisplay
            value={JSON.stringify(choice.decodedMessages, undefined, 2)}
          />
        ) : (
          <ActionsRenderer
            actionData={choice.actionData}
            onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
          />
        )}
      </div>
    )
  })

  const innerContentDisplay = (
    <div>
      <p className="primary-text pb-5 text-text-body">
        {t('title.voteOptions')}
      </p>
      {choiceDisplay}
    </div>
  )

  return (
    <StatelessProposalInnerContentDisplay
      duplicate={duplicate}
      innerContentDisplay={innerContentDisplay}
      setShowRaw={setShowRaw}
      showRaw={showRaw}
    />
  )
}
