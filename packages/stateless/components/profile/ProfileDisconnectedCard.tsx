import {
  LayersOutlined,
  PaymentsOutlined,
  SensorsOff,
} from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileImage } from './ProfileImage'

export const ProfileDisconnectedCard = () => {
  const { t } = useTranslation()
  const [cyclopsMode, setCyclopsMode] = useState(false)

  return (
    <div className="border-border-primary relative rounded-lg border">
      <div className="p-6">
        <div className="flex flex-col items-center justify-center pt-4">
          {cyclopsMode ? (
            <ProfileImage
              imageUrl="/odysseus.jpg"
              onClick={() => setCyclopsMode(false)}
              size="lg"
            />
          ) : (
            <div
              className="border-border-primary bg-component-widget flex h-16 w-16 items-center justify-center rounded-2xl border"
              onClick={() => setCyclopsMode(true)}
            >
              <SensorsOff className="text-icon-interactive-disabled !h-5 !w-5" />
            </div>
          )}
          <div className="title-text text-text-body mt-6">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {cyclopsMode ? 'Odysseus' : t('title.nobody')}
          </div>
          <div className="caption-text mt-2 mb-5 font-mono">
            {t('info.connectYourWallet')}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_1px_1fr] items-center justify-items-center gap-2 self-stretch">
            <div className="flex flex-col items-stretch text-center">
              <PaymentsOutlined className="text-icon-secondary mb-4 !h-5 !w-5 self-center text-center" />
              <p className="secondary-text mb-1">{t('title.holdings')}</p>
              <p className="title-text font-mono">--</p>
            </div>

            <div className="bg-border-secondary h-10 w-[1px]"></div>

            <div className="flex flex-col items-center text-center">
              <LayersOutlined className="text-icon-secondary mb-4 !h-5 w-5 self-center" />
              <p className="secondary-text mb-1">{t('title.staked')}</p>
              <p className="title-text font-mono">--</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-border-primary flex flex-col items-stretch border-t p-6">
        <div className="secondary-text flex flex-row items-center justify-between">
          <p>{t('title.membership')}</p>
          <p className="text-text-primary font-mono">--</p>
        </div>

        <div className="secondary-text mt-3 flex flex-row items-center justify-between">
          <p>{t('title.contributions')}</p>
          <p className="text-text-primary font-mono">--</p>
        </div>
      </div>
    </div>
  )
}
