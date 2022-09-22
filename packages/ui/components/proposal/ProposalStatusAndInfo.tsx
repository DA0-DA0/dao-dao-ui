import { AnalyticsOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

export interface ProposalStatusAndInfoProps {
  status: string
  info: {
    Icon: ComponentType<{ className: string }>
    label: string
    Value: ComponentType<{ className: string }>
  }[]
  inline?: boolean
}

export const ProposalStatusAndInfo = ({
  status,
  info,
  inline = false,
}: ProposalStatusAndInfoProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        inline
          ? 'mb-4 bg-background-tertiary rounded-lg border border-border-secondary md:hidden'
          : 'hidden md:block'
      )}
    >
      <div className={clsx('flex flex-col gap-4', inline ? 'p-6' : 'pb-10')}>
        <div className="flex flex-row gap-3 items-center">
          <AnalyticsOutlined className="w-6 h-6 text-icon-secondary" />
          <p className="secondary-text">{t('title.status')}</p>
        </div>

        <p className="text-text-secondary body-text">{status}</p>
      </div>

      <div
        className={clsx(
          'grid grid-cols-2 gap-3 items-center border-t border-border-secondary',
          inline ? 'p-6' : 'py-8 border-b'
        )}
      >
        {info.map(({ Icon, label, Value }, index) => (
          <Fragment key={index}>
            <div className="flex flex-row gap-3 items-center">
              <Icon className="w-6 h-6 text-icon-secondary" />
              <p className="secondary-text">{label}</p>
            </div>

            <Value className="!font-mono !text-base !font-medium !leading-5 text-left !text-text-body" />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
