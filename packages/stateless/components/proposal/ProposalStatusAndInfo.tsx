import { AnalyticsOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalVoteOption } from '@dao-dao/types'

import { Button } from '../buttons'
import { ProposalVoteButton } from './ProposalVoteButton'

export interface ProposalStatusAndInfoProps<Vote> {
  status: string
  info: {
    Icon: ComponentType<{ className: string }>
    label: string
    Value: ComponentType<{ className: string }>
  }[]
  inline?: boolean
  action?: {
    label: string
    Icon: ComponentType<{ className: string }>
    loading: boolean
    doAction: () => void
  }
  // Present if can vote.
  vote?: {
    loading: boolean
    currentVote?: Vote
    onCastVote: (vote: Vote) => void | Promise<void>
    options: ProposalVoteOption<Vote>[]
  }
}

export const ProposalStatusAndInfo = <Vote extends unknown>({
  status,
  info,
  inline = false,
  action,
  vote,
}: ProposalStatusAndInfoProps<Vote>) => {
  const { t } = useTranslation()

  const [selectedVote, setSelectedVote] = useState<Vote | undefined>(
    vote?.currentVote
  )

  return (
    <div
      className={clsx(
        'flex flex-col items-stretch',
        inline &&
          'rounded-lg border border-border-secondary bg-background-tertiary'
      )}
    >
      <div className={clsx('flex flex-col gap-4', inline ? 'p-6' : 'pb-10')}>
        <div className="flex flex-row items-center gap-3">
          <AnalyticsOutlined className="h-6 w-6 text-icon-secondary" />
          <p className="secondary-text">{t('title.status')}</p>
        </div>

        <p className="body-text text-text-secondary">{status}</p>
      </div>

      <div
        className={clsx(
          'grid grid-cols-2 items-center gap-3 border-t border-border-secondary',
          inline ? 'p-6' : action ? 'pt-8 pb-6' : 'py-8'
        )}
      >
        {info.map(({ Icon, label, Value }, index) => (
          <Fragment key={index}>
            <div className="flex flex-row items-center gap-3">
              <Icon className="h-6 w-6 text-icon-secondary" />
              <p className="secondary-text">{label}</p>
            </div>

            <Value className="text-left !font-mono !text-base !font-medium !leading-5 !text-text-body" />
          </Fragment>
        ))}
      </div>

      {action && (
        <Button
          center
          className={inline ? 'm-6 mt-0' : 'mb-8'}
          loading={action.loading}
          onClick={action.doAction}
          size="lg"
          variant={
            // If voting is not displaying, or voting is displaying but they
            // already voted (i.e. they can revote), show primary variant to
            // draw attention to this action. Otherwise, show dimmer secondary
            // variant to encourage them to vote first.
            !vote || vote.currentVote ? 'primary' : 'secondary'
          }
        >
          <action.Icon className="!h-5 !w-5" /> {action.label}
        </Button>
      )}

      {vote && (
        <div
          className={clsx(
            'flex flex-col items-stretch gap-1 border-t border-border-secondary',
            inline ? 'p-6' : 'pt-8'
          )}
        >
          {vote.options.map((option, index) => (
            <ProposalVoteButton
              key={index}
              disabled={vote.loading}
              onClick={() => setSelectedVote(option.value)}
              option={option}
              pressed={option.value === selectedVote}
            />
          ))}

          <Button
            className="mt-3"
            contentContainerClassName={clsx('justify-center', {
              'primary-text': !selectedVote,
            })}
            disabled={!selectedVote}
            loading={vote.loading}
            onClick={() => selectedVote && vote.onCastVote(selectedVote)}
            size="lg"
            variant={
              // If already voted, show dimmer secondary variant. If needs to
              // vote, show primary to draw attention to it.
              vote.currentVote ? 'secondary' : 'primary'
            }
          >
            {t('button.castYourVote')}
          </Button>
        </div>
      )}
    </div>
  )
}
