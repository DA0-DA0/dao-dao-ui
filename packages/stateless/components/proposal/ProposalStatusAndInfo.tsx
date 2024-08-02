import { AnalyticsOutlined, Key, ThumbDown } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../buttons'
import { StatusCard } from '../StatusCard'
import { ProposalVoteButton } from './ProposalVoteButton'

export type ProposalStatusAndInfoProps = {
  status?: string
  info: {
    Icon: ComponentType<{ className: string }>
    label: string
    Value: ComponentType<{ className: string }>
  }[]
  inline?: boolean
  action?: {
    header?: ReactNode
    label?: string
    description?: string
    Icon?: ComponentType<{ className: string }>
    loading?: boolean
    doAction?: () => void
  }
  // Present if can veto.
  vetoOrEarlyExecute?: {
    loading: 'veto' | 'earlyExecute' | false
    onVeto: () => void | Promise<void>
    // If defined, the vetoer is allowed to execute instead of veto.
    onEarlyExecute?: () => void | Promise<void>
    // Whether or not the vetoer is a DAO and the current user is a member of
    // that vetoer DAO.
    isVetoerDaoMember: boolean
    // Whether or not this is part of the Neutron fork overrule flow.
    isNeutronOverrule: boolean
  }
  footer?: ReactNode
  className?: string
  /**
   * Voter component. Only shown on desktop. Should only be defined if can vote.
   */
  Voter?: ComponentType<{ className: string }>
}

export const ProposalStatusAndInfo = ({
  status,
  info,
  inline = false,
  action,
  vetoOrEarlyExecute,
  footer,
  className,
  Voter,
}: ProposalStatusAndInfoProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex flex-col items-stretch',
        inline &&
          'rounded-lg border border-border-secondary bg-background-tertiary',
        className
      )}
    >
      {!!status && (
        <div
          className={clsx(
            'flex flex-col gap-4 border-b border-border-secondary',
            inline ? 'p-6' : 'pb-10'
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <AnalyticsOutlined className="h-6 w-6 text-icon-secondary" />
            <p className="secondary-text">{t('title.status')}</p>
          </div>

          <p className="body-text text-text-secondary">{status}</p>
        </div>
      )}

      <div
        className={clsx(
          'grid items-center justify-items-start gap-2',
          inline
            ? 'grid-cols-[1.25rem_2fr_7fr]'
            : 'grid-cols-[1.25rem_2fr_5fr]',
          inline ? 'p-6' : action || footer ? 'pt-8 pb-6' : 'py-8'
        )}
      >
        {info.map(({ Icon, label, Value }, index) => (
          <Fragment key={index}>
            <Icon className="!h-5 !w-5 text-icon-secondary" />

            <p className="secondary-text w-full">{label}</p>

            <Value className="max-w-full !pl-3 !font-mono !text-sm !font-medium !leading-5 !text-text-body" />
          </Fragment>
        ))}
      </div>

      {action && (
        <div
          className={clsx(
            'flex animate-fade-in flex-col gap-4',
            inline ? 'm-6 mt-0' : 'mb-8'
          )}
        >
          {action.header}

          {action.doAction && (
            <Button
              center
              loading={action.loading}
              onClick={action.doAction}
              size="lg"
              variant="primary"
            >
              {action.Icon && <action.Icon className="!h-5 !w-5" />}
              {action.label}
            </Button>
          )}

          {action.description && (
            <StatusCard content={action.description} size="xs" style="info" />
          )}
        </div>
      )}

      {Voter && (
        <Voter
          className={clsx(
            'hidden border-t border-border-secondary md:flex',
            inline ? 'p-6' : footer ? 'pt-8 pb-6' : 'py-8'
          )}
        />
      )}

      {vetoOrEarlyExecute && (
        <div
          className={clsx(
            'flex flex-col gap-4 border-t border-border-secondary',
            inline ? 'p-6' : footer ? 'pt-8 pb-6' : 'py-8'
          )}
        >
          <div className="flex flex-col gap-1">
            {!vetoOrEarlyExecute.isNeutronOverrule &&
              vetoOrEarlyExecute.isVetoerDaoMember && (
                <StatusCard
                  content={t('info.vetoActionDaoMemberExplanation', {
                    context: vetoOrEarlyExecute.onEarlyExecute
                      ? 'withEarlyExecute'
                      : 'withoutEarlyExecute',
                  })}
                  size="xs"
                  style="info"
                />
              )}

            {vetoOrEarlyExecute.onEarlyExecute && (
              <StatusCard
                content={t('info.vetoEarlyExecuteExplanation')}
                size="xs"
                style="info"
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <ProposalVoteButton
              loading={vetoOrEarlyExecute.loading === 'veto'}
              onClick={vetoOrEarlyExecute.onVeto}
              option={{
                Icon: ThumbDown,
                value: 'veto',
                label: vetoOrEarlyExecute.isNeutronOverrule
                  ? t('button.goToOverruleProposal')
                  : t('button.veto'),
              }}
            />

            {vetoOrEarlyExecute.onEarlyExecute && (
              <ProposalVoteButton
                loading={vetoOrEarlyExecute.loading === 'earlyExecute'}
                onClick={vetoOrEarlyExecute.onEarlyExecute}
                option={{
                  Icon: Key,
                  value: 'execute',
                  label: t('button.execute'),
                }}
              />
            )}
          </div>
        </div>
      )}

      {footer && (
        <div
          className={clsx(
            'animate-fade-in',
            inline && 'border-t border-border-secondary p-6'
          )}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
