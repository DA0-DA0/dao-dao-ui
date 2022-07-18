import { ArchiveIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

export interface CloseProposalProps {
  onClose: () => void
  willRefundProposalDeposit: boolean
  loading: boolean
}

export const CloseProposal = ({
  onClose,
  willRefundProposalDeposit,
  loading,
}: CloseProposalProps) => {
  const { t } = useTranslation()
  const [partyMode, setPartyMode] = useState(false)
  const [partyPhase, setPartyPhase] = useState(1)

  return (
    <>
      {!partyMode && (
        <div className="flex gap-4 justify-between items-center p-4 max-w-3xl bg-primary rounded-lg border border-default">
          <div className="flex gap-2 items-center">
            <button
              className="mr-1 text-2xl"
              onClick={() => setPartyMode(true)}
            >
              <Emoji label={t('emoji.x')} symbol="❌" />
            </button>

            <div className="flex flex-col gap-1">
              <p className="primary-text">{t('info.rejected')}</p>
              {willRefundProposalDeposit && (
                <p className="secondary-text">
                  {t('info.proposalDepositWillBeRefunded')}
                </p>
              )}
            </div>
          </div>
          <Button loading={loading} onClick={onClose}>
            {t('button.close')} <ArchiveIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
      {partyMode && (
        <div className="flex gap-4 justify-between items-center p-4 max-w-3xl bg-primary rounded-lg border border-default">
          <div className="flex gap-2 items-center">
            <button
              className={clsx(
                'mr-1 text-2xl',
                [
                  '',
                  'animate-rumble',
                  'animate-rumble-fast',
                  'animate-rumble-faster',
                  'animate-rumble-fastest',
                ][partyPhase]
              )}
              onClick={() => {
                setPartyMode(false)
                setPartyPhase(1)
              }}
              type="button"
            >
              <Emoji label={t('emoji.rocketShip')} symbol="🚀" />
            </button>

            <div className="flex flex-col gap-1">
              <p className="primary-text">{t('info.closing')}</p>
              {willRefundProposalDeposit && (
                <p className="secondary-text">
                  {t('info.proposalDepositWillBeRefunded')}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              className={clsx('text-white bg-error hover:bg-error hover:ring', {
                invisible: partyPhase !== 1,
              })}
              onClick={() => setPartyPhase(2)}
              variant="secondary"
            >
              3
            </Button>
            <Button
              className={clsx('text-white bg-error hover:bg-error hover:ring', {
                invisible: partyPhase !== 2,
              })}
              onClick={() => setPartyPhase(3)}
              variant="secondary"
            >
              2
            </Button>
            <Button
              className={clsx('text-white bg-error hover:bg-error hover:ring', {
                invisible: partyPhase !== 3,
              })}
              onClick={() => setPartyPhase(4)}
              variant="secondary"
            >
              1
            </Button>

            <Button
              className={clsx({
                invisible: partyPhase !== 4,
              })}
              loading={loading}
              onClick={onClose}
            >
              {t('button.close')} <ArchiveIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
