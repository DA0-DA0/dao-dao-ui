import { AnalyticsOutlined, Check } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CosmosMessageDisplay,
  DropdownIconButton,
  Tooltip,
} from '@dao-dao/stateless'
import { Action, ActionAndData, ProposalVoteOption } from '@dao-dao/types'
import {
  CheckedMultipleChoiceOption,
  MultipleChoiceOptionType,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/DaoProposalMultiple'

import { ActionsRenderer } from '../../../../../actions'

export type MultipleChoiceOptionData = {
  choice: CheckedMultipleChoiceOption
  actionData: ActionAndData[]
  decodedMessages: {
    [key: string]: any
  }[]
  voteOption: ProposalVoteOption<MultipleChoiceVote>
}

export type MultipleChoiceOptionViewerProps = {
  data: MultipleChoiceOptionData
  lastOption: boolean
  availableActions: Action[]
  winner: boolean
}

export const MultipleChoiceOptionViewer = ({
  data: { choice, actionData, decodedMessages, voteOption },
  lastOption,
  availableActions,
  winner,
}: MultipleChoiceOptionViewerProps) => {
  const { t } = useTranslation()

  const [showRaw, setShowRaw] = useState(false)

  // Close none of the above and disallow expanding.
  const [expanded, setExpanded] = useState(
    choice.option_type !== MultipleChoiceOptionType.None
  )
  const toggleExpanded = () => setExpanded((e) => !e)

  const isNoneOption = choice.option_type === MultipleChoiceOptionType.None

  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-6 py-4',
        // No bottom border on last item.
        !lastOption && 'border-b border-border-secondary'
      )}
    >
      <div
        className={clsx(
          'flex flex-row items-center gap-6',
          !isNoneOption && 'cursor-pointer'
        )}
        onClick={!isNoneOption ? toggleExpanded : undefined}
      >
        <div className="flex grow flex-row items-center gap-2">
          <DropdownIconButton
            className={clsx(
              // Disable instead of hiding if none option to preserve the space
              // layout but disallow expanding.
              isNoneOption && 'pointer-events-none opacity-0'
            )}
            open={expanded}
            toggle={
              // Container has toggle handler.
              () => {}
            }
          />

          <voteOption.Icon
            className="!h-4 !w-4"
            style={{
              color: voteOption.color,
            }}
          />
          <p className="primary-text text-text-body">{choice.title}</p>
        </div>

        {winner && (
          <Tooltip title={t('info.winningOptionTooltip')}>
            <Check className="!h-6 !w-6 !text-icon-interactive-valid" />
          </Tooltip>
        )}
      </div>

      <div
        className={clsx(
          'ml-3 -mb-4 flex flex-col gap-6 border-l-[3px] border-border-interactive-focus pl-5 pb-5',
          !expanded && 'hidden'
        )}
      >
        {!isNoneOption && (
          <p className="secondary-text">{choice.description}</p>
        )}

        {showRaw ? (
          <CosmosMessageDisplay
            value={JSON.stringify(decodedMessages, undefined, 2)}
          />
        ) : (
          <ActionsRenderer
            actionData={actionData}
            availableActions={availableActions}
            onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
          />
        )}

        <Button
          className="-mt-4 self-end"
          onClick={() => setShowRaw(!showRaw)}
          variant="ghost"
        >
          <AnalyticsOutlined className="text-icon-secondary" />
          <p className="secondary-text">
            {showRaw ? t('button.hideRawData') : t('button.showRawData')}
          </p>
        </Button>
      </div>
    </div>
  )
}
