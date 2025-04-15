import { DataObject } from '@mui/icons-material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ActionsMatchAndRender,
  Button,
  RawActionsRenderer,
} from '@dao-dao/stateless'
import { ActionKeyAndData, UnifiedCosmosMsg } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'

export type ProposalMessagesDisplayProps = {
  /**
   * Messages to display.
   */
  messages: UnifiedCosmosMsg[]
  /**
   * Callback when all actions and data are loaded.
   */
  onLoad?: (data: ActionKeyAndData[]) => void
}

export const ProposalMessagesDisplay = ({
  messages,
  onLoad,
}: ProposalMessagesDisplayProps) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)

  return messages.length ? (
    <div className="flex flex-col gap-3">
      <ActionsMatchAndRender
        SuspenseLoader={SuspenseLoader}
        messages={messages}
        onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
        onLoad={onLoad}
      />

      <Button
        className="self-start"
        onClick={() => setShowRaw((s) => !s)}
        variant="ghost"
      >
        <DataObject className="text-icon-secondary" />
        <p className="secondary-text">
          {showRaw ? t('button.hideRawData') : t('button.showRawData')}
        </p>
      </Button>

      {showRaw && <RawActionsRenderer messages={messages} />}
    </div>
  ) : (
    <p className="caption-text italic">{t('info.noProposalActions')}</p>
  )
}
