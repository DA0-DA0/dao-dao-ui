import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Tooltip } from './tooltip'

export type ApprovalBadgeProps = {
  size: 'sm' | 'lg'
  tooltip?: boolean
  className?: string
}

export const ApprovalBadge = ({
  size,
  tooltip,
  className,
}: ApprovalBadgeProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip
      title={tooltip ? t('info.approvalProposalExplanation') : undefined}
    >
      <p
        className={clsx(
          {
            'body-text rounded-md': size === 'sm',
            'title-text rounded-lg': size === 'lg',
          },
          'flex shrink-0 flex-row items-center bg-background-primary py-1 px-2',
          className
        )}
      >
        {t('title.approval')}
      </p>
    </Tooltip>
  )
}
