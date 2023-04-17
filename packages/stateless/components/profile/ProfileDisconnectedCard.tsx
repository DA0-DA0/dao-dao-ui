import {
  LayersOutlined,
  PaymentsOutlined,
  SensorsOff,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export interface ProfileDisconnectedCardProps {
  connectWallet: ReactNode
  className?: string
}

export const ProfileDisconnectedCard = ({
  connectWallet,
  className,
}: ProfileDisconnectedCardProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'relative rounded-lg border border-border-primary',
        className
      )}
    >
      <div className="p-6">
        <div className="flex flex-col items-center justify-center pt-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border-primary bg-component-widget">
            <SensorsOff className="!h-5 !w-5 text-icon-interactive-disabled" />
          </div>

          <div className="title-text mt-6 font-normal text-text-tertiary">
            {t('title.loggedOut')}
          </div>

          <div className="my-5">{connectWallet}</div>

          <div className="mt-3 grid grid-cols-[1fr_1px_1fr] items-center justify-items-center gap-2 self-stretch">
            <div className="flex flex-col items-stretch text-center">
              <PaymentsOutlined className="mb-4 !h-5 !w-5 self-center text-center text-icon-secondary" />
              <p className="secondary-text mb-1">{t('title.holdings')}</p>
              <p className="title-text font-mono">--</p>
            </div>

            <div className="h-10 w-[1px] bg-border-secondary"></div>

            <div className="flex flex-col items-center text-center">
              <LayersOutlined className="mb-4 !h-5 w-5 self-center text-icon-secondary" />
              <p className="secondary-text mb-1">{t('title.staked')}</p>
              <p className="title-text font-mono">--</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch border-t border-t-border-primary p-6">
        <div className="secondary-text flex flex-row items-center justify-between">
          <p>{t('title.proposalsCreated')}</p>
          <p className="font-mono text-text-primary">--</p>
        </div>

        <div className="secondary-text mt-3 flex flex-row items-center justify-between">
          <p>{t('title.votesCast')}</p>
          <p className="font-mono text-text-primary">--</p>
        </div>
      </div>
    </div>
  )
}
