import { AnalyticsOutlined, HowToVoteRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../buttons'
import { useAppLayoutContext } from '../layout/AppLayoutContext'
import { NoContent } from '../NoContent'

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
  canVote: boolean
}

export const ProposalStatusAndInfo = ({
  status,
  info,
  inline = false,
  action,
  canVote,
}: ProposalStatusAndInfoProps) => {
  const { t } = useTranslation()

  const toggleRightSidebar = useAppLayoutContext().responsiveRightSidebar.toggle

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
          (!inline || (inline && (!!action || canVote))) && 'border-b'
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

      {canVote && (
        <div
          className={clsx(
            'flex flex-col items-stretch gap-2',
            inline ? 'm-6' : 'mt-8'
          )}
        >
          {/* Large screens, sidebar showing */}
          <NoContent
            Icon={HowToVoteRounded}
            body={t('info.voteInSidebarLarge')}
            className="hidden xl:flex"
            small
          />
          {/* Responsive, sidebar collapsed */}
          <NoContent
            Icon={HowToVoteRounded}
            actionNudge={t('info.voteInSidebarResponsiveNudge')}
            body={t('info.voteInSidebarResponsiveBody')}
            buttonLabel={t('button.openSidebarToVote')}
            className="xl:hidden"
            onClick={toggleRightSidebar}
            small
          />
        </div>
      )}

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
