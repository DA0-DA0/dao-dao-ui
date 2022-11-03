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
    <div className="border-border-primary relative rounded-lg border">
      <div className="border-border-secondary space-y-1 border-b p-6">
        <p className="title-text text-text-body">
          {t('title.daoCreationProcess')}
        </p>
        <p className="secondary-text text-text-body">
          {t('info.daoCreationProcessExplanation')}
        </p>
      </div>

      <div className="flex flex-row items-stretch">
        <div className="border-border-primary w-8 border-r-4"></div>
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
                className="relative left-[calc(-0.75rem-2px)] flex flex-row items-center gap-3 py-2"
              >
                <div
                  className={clsx(
                    'flex h-6 w-6 items-center justify-center rounded-full',
                    ((current && pageIndex > 1) || future) &&
                      'bg-background-base'
                  )}
                >
                  <div
                    className={clsx('rounded-full', {
                      'h-3 w-3': current || future,
                      'bg-icon-brand': current,
                      'bg-icon-interactive-disabled': future,
                      'bg-background-button flex h-4 w-4 items-center justify-center':
                        done,
                    })}
                  >
                    {done && (
                      <Check className="text-background-base !h-3 !w-3" />
                    )}
                  </div>
                </div>
                <p
                  className={clsx('link-text font-mono', {
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
