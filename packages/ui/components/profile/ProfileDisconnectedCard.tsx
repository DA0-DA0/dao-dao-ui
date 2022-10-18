import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Disconnected, Layers, Payments } from '@dao-dao/icons'

import { ProfileImage } from './ProfileImage'

export const ProfileDisconnectedCard = () => {
  const { t } = useTranslation()
  const [cyclopsMode, setCyclopsMode] = useState(false)

  return (
    <div className="relative rounded-lg border border-border-primary">
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
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border-primary bg-component-widget"
              onClick={() => setCyclopsMode(true)}
            >
              <Disconnected className="h-5 w-5 text-icon-interactive-disabled" />
            </div>
          )}
          <div className="title-text mt-6 text-text-body">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {cyclopsMode ? 'Odysseus' : t('title.nobody')}
          </div>
          <div className="caption-text mt-2 mb-5 font-mono">
            {t('info.connectYourWallet')}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_1px_1fr] items-center justify-items-center gap-2 self-stretch">
            <div className="flex flex-col items-stretch text-center">
              <Payments className="mb-4 h-4 w-5 self-center text-center text-icon-secondary" />
              <p className="secondary-text mb-1">{t('title.holdings')}</p>
              <p className="title-text font-mono">--</p>
            </div>

            <div className="h-10 w-[1px] bg-border-secondary"></div>

            <div className="flex flex-col items-center text-center">
              <Layers className="mb-4 h-4 w-5 self-center text-icon-secondary" />
              <p className="secondary-text mb-1">{t('title.staked')}</p>
              <p className="title-text font-mono">--</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch border-t border-t-border-primary p-6">
        <div className="secondary-text flex flex-row items-center justify-between">
          <p>{t('title.membership')}</p>
          <p className="font-mono text-text-primary">--</p>
        </div>

        <div className="secondary-text mt-3 flex flex-row items-center justify-between">
          <p>{t('title.contributions')}</p>
          <p className="font-mono text-text-primary">--</p>
        </div>
      </div>
    </div>
  )
}
