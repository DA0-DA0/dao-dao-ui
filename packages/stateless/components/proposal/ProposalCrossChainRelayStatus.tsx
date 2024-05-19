import { Check, Close } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { CrossChainPacketInfoStatus, ProposalRelayState } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { Loader } from '../logo'
import { StatusCard } from '../StatusCard'
import { Tooltip } from '../tooltip'

export type ProposalCrossChainRelayStatusProps = {
  state: ProposalRelayState
}

export const ProposalCrossChainRelayStatus = ({
  state: { hasCrossChainMessages, needsSelfRelay, states },
}: ProposalCrossChainRelayStatusProps) => {
  const { t } = useTranslation()

  if (!hasCrossChainMessages) {
    return null
  }

  return states.pending.length > 0 ? (
    !needsSelfRelay ? (
      <StatusCard
        content={t('info.relayingCrossChainMessages')}
        size="xs"
        style="loading"
      />
    ) : null
  ) : states.errored.length + states.timedOut.length > 0 ? (
    <StatusCard
      content={t('error.crossChainMessagesErroredOrTimedOut')}
      iconAtTop
      size="xs"
      style="warning"
    >
      <div className="flex flex-col gap-2 self-stretch">
        {states.all.map((state, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <div className="flex flex-row justify-between items-center gap-x-6 gap-y-2 flex-wrap">
              <p className="caption-text text-sm">
                {t('title.actionNumber', {
                  number: index + 1,
                })}
              </p>

              {state.status === CrossChainPacketInfoStatus.Pending ? (
                <Tooltip title={t('title.pending')}>
                  <Loader fill={false} size={16} />
                </Tooltip>
              ) : state.status === CrossChainPacketInfoStatus.Relayed ? (
                <Tooltip title={t('title.relayed')}>
                  <Check className="!h-4 !w-4 !text-icon-interactive-valid" />
                </Tooltip>
              ) : state.status === CrossChainPacketInfoStatus.Errored ||
                state.status === CrossChainPacketInfoStatus.TimedOut ? (
                <Tooltip title={t('title.errored')}>
                  <Close className="!h-4 !w-4 !text-icon-interactive-error" />
                </Tooltip>
              ) : null}
            </div>

            {state.status === CrossChainPacketInfoStatus.Errored ? (
              <pre className="text-text-interactive-error whitespace-pre-wrap text-xs">
                {processError(state.error, { forceCapture: false })}
              </pre>
            ) : state.status === CrossChainPacketInfoStatus.TimedOut ? (
              <p className="legend-text text-text-interactive-error">
                {t('title.timedOut')}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </StatusCard>
  ) : (
    <StatusCard
      content={t('success.crossChainMessagesRelayed')}
      size="xs"
      style="success"
    />
  )
}
