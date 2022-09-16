import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export interface DaoCreateSidebarCardProps {
  pageIndex: number
}

export const DaoCreateSidebarCard = ({
  pageIndex,
}: DaoCreateSidebarCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="relative rounded-lg border border-border-primary">
      <div className="p-6 space-y-1 border-b border-border-secondary">
        <p className="text-text-body title-text">
          {t('title.daoCreationProcess')}
        </p>
        <p className="text-text-body secondary-text">
          {t('info.daoCreationProcessExplanation')}
        </p>
      </div>

      <div className="flex flex-row items-stretch">
        <div className="w-8 border-r-4 border-border-primary"></div>
        <div className="flex flex-col py-4">
          {[
            t('info.createStep1'),
            t('info.createStep2'),
            t('info.createStep3'),
            t('info.createStep4'),
          ].map((stepLabel, index) => {
            const done = pageIndex > index
            const current = pageIndex === index
            const future = pageIndex < index

            return (
              <div
                key={index}
                // Offset by half width of circle and half width of border, so
                // the orb is centered on the line (w-6 is 1.5rem, so half is
                // 0.75rem).
                className="flex relative left-[calc(-0.75rem-2px)] flex-row gap-3 items-center py-2"
              >
                <div
                  className={clsx(
                    'flex justify-center items-center w-6 h-6 rounded-full',
                    ((current && pageIndex > 1) || future) &&
                      'bg-background-base'
                  )}
                >
                  <div
                    className={clsx('rounded-full', {
                      'w-3 h-3': current || future,
                      'bg-icon-brand': current,
                      'bg-icon-interactive-disabled': future,
                      'flex justify-center items-center w-4 h-4 bg-background-button':
                        done,
                    })}
                  >
                    {done && (
                      <Check className="!w-3 !h-3 text-background-base" />
                    )}
                  </div>
                </div>
                <p
                  className={clsx('font-mono link-text', {
                    'text-icon-primary': done,
                    'text-text-interactive-active': current,
                    'text-text-interactive-disabled': future,
                  })}
                >
                  {index + 1}.
                </p>
                <p
                  className={clsx('link-text', {
                    'text-text-primary': done,
                    'text-text-interactive-active': current,
                    'text-text-interactive-disabled': future,
                  })}
                >
                  {stepLabel}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
