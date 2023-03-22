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
import { Action } from '@dao-dao/types'
import { MultipleChoiceOptionType } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { ActionsRenderer } from '../../../../../actions'
import { MultipleChoiceOptionData } from '../../types'

export type MultipleChoiceOptionViewerProps = {
  data: MultipleChoiceOptionData
  lastOption: boolean
  availableActions: Action[]
  // If undefined, no winner picked yet.
  winner?: boolean
  // Used when previewing to force raw JSON display.
  forceRaw?: boolean
}

export const MultipleChoiceOptionViewer = ({
  data: { choice, actionData, decodedMessages, voteOption },
  lastOption,
  availableActions,
  winner,
  forceRaw,
}: MultipleChoiceOptionViewerProps) => {
  const { t } = useTranslation()

  const [showRaw, setShowRaw] = useState(false)

  // Close none of the above and disallow expanding.
  const [expanded, setExpanded] = useState(
    choice.option_type !== MultipleChoiceOptionType.None &&
      // Default collapsed if there is a winner and it is not this one.
      (winner === undefined || winner)
  )
  const toggleExpanded = () => setExpanded((e) => !e)

  const isNoneOption = choice.option_type === MultipleChoiceOptionType.None

  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-6 pt-6',
        !expanded && 'pb-6',
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

          <p className="title-text">
            {isNoneOption ? t('title.noneOfTheAbove') : choice.title}
          </p>
        </div>

        {winner && (
          <Tooltip title={t('info.winningOptionTooltip')}>
            <Check className="!h-6 !w-6" />
          </Tooltip>
        )}
      </div>

      <div
        className={clsx(
          'ml-[calc(0.75rem-1.5px)] flex flex-col gap-6 border-l-[3px] border-border-interactive-focus pl-5 pb-5 pt-1',
          !expanded && 'hidden'
        )}
      >
        {!isNoneOption && !!choice.description && (
          <p className="body-text">{choice.description}</p>
        )}

        {(forceRaw === undefined && showRaw) || forceRaw
          ? decodedMessages.length > 0 && (
              <CosmosMessageDisplay
                value={JSON.stringify(decodedMessages, undefined, 2)}
              />
            )
          : actionData.length > 0 && (
              <ActionsRenderer
                actionData={actionData}
                availableActions={availableActions}
                onCopyLink={() =>
                  toast.success(t('info.copiedLinkToClipboard'))
                }
              />
            )}

        {forceRaw === undefined && (
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
        )}
      </div>
    </div>
  )
}
