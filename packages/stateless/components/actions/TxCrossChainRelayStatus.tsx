import { ArrowOutwardRounded, Check, Close } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { CrossChainPacketInfoStatus, TxRelayState } from '@dao-dao/types'
import { getConfiguredChainConfig, processError } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { IconButtonLink } from '../icon_buttons'
import { Loader } from '../logo'
import { StatusCard } from '../StatusCard'
import { Tooltip } from '../tooltip'

export type TxCrossChainRelayStatusProps = {
  state: TxRelayState
  /**
   * Whether or not all data is loaded and self-relay can occur.
   */
  canSelfRelay: boolean
  /**
   * The error that occurred when loading the data needed to self-relay.
   */
  selfRelayLoadError?: Error
}

export const TxCrossChainRelayStatus = ({
  state: { hasCrossChainMessages, needsSelfRelay, states, openSelfRelay },
  canSelfRelay,
  selfRelayLoadError,
}: TxCrossChainRelayStatusProps) => {
  const { t } = useTranslation()

  if (!hasCrossChainMessages) {
    return null
  }

  const hasErrorOrTimedOut = states.errored.length + states.timedOut.length > 0
  const hasPending = states.pending.length > 0
  return (
    <StatusCard
      content={
        hasErrorOrTimedOut
          ? t('error.crossChainMessagesErroredOrTimedOut')
          : hasPending
            ? needsSelfRelay
              ? t('info.crossChainMessagesNeedSelfRelay', {
                  context: selfRelayLoadError ? 'errored' : undefined,
                  error: selfRelayLoadError
                    ? processError(selfRelayLoadError, {
                        forceCapture: true,
                      })
                    : undefined,
                })
              : t('info.relayingCrossChainMessages')
            : t('success.crossChainMessagesRelayed')
      }
      contentContainerClassName="min-w-0"
      iconAtTop
      onClick={
        hasPending && needsSelfRelay && canSelfRelay ? openSelfRelay : undefined
      }
      size="xs"
      style={
        hasErrorOrTimedOut || (hasPending && needsSelfRelay)
          ? 'warning'
          : hasPending
            ? 'loading'
            : 'success'
      }
    >
      <div className="flex flex-col gap-2 self-stretch">
        {states.all.map((state, index) => {
          const destChainId = state.packet.data.chainId
          const explorerUrlTemplates =
            getConfiguredChainConfig(destChainId)?.explorerUrlTemplates

          return (
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

              {state.status === CrossChainPacketInfoStatus.Relayed &&
              state.txHashes?.length ? (
                <div className="flex flex-col gap-1 pl-2">
                  {state.txHashes.map((hash) => (
                    <div
                      key={hash}
                      className="flex w-full flex-row items-center gap-1 overflow-hidden min-w-0"
                    >
                      <CopyToClipboardUnderline
                        // Will truncate automatically.
                        takeAll
                        value={hash}
                      />

                      {!!explorerUrlTemplates?.tx && (
                        <IconButtonLink
                          Icon={ArrowOutwardRounded}
                          href={explorerUrlTemplates.tx.replace(
                            'REPLACE',
                            hash
                          )}
                          size="xs"
                          variant="ghost"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : state.status === CrossChainPacketInfoStatus.Errored ? (
                <pre className="text-text-interactive-error whitespace-pre-wrap text-xs">
                  {processError(state.error, { forceCapture: false })}
                </pre>
              ) : state.status === CrossChainPacketInfoStatus.TimedOut ? (
                <p className="legend-text text-text-interactive-error">
                  {t('title.timedOut')}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </StatusCard>
  )
}
