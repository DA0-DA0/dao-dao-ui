import { AnalyticsOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

export interface ProposalStatusAndInfoProps {
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
}

export const ProposalStatusAndInfo = ({
  status,
  info,
  inline = false,
  action,
}: ProposalStatusAndInfoProps) => {
  const { t } = useTranslation()

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
          inline ? 'p-6' : 'py-8',
          // If not inline, or an action button is present, add bottom border.
          (!inline || (inline && action)) && 'border-b'
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
          className={inline ? 'm-6' : 'mt-8'}
          loading={action.loading}
          onClick={action.doAction}
          size="lg"
        >
          <action.Icon className="!h-5 !w-5" /> {action.label}
        </Button>
      )}
    </div>
  )
}
