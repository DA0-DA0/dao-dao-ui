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
        <div className="flex flex-col justify-center items-center pt-4">
          {cyclopsMode ? (
            <ProfileImage
              imageUrl="/odysseus.jpg"
              onClick={() => setCyclopsMode(false)}
              size="lg"
            />
          ) : (
            <div
              className="flex justify-center items-center w-16 h-16 bg-component-widget rounded-2xl border border-border-primary"
              onClick={() => setCyclopsMode(true)}
            >
              <Disconnected className="w-5 h-5 text-icon-interactive-disabled" />
            </div>
          )}
          <div className="mt-6 text-text-body title-text">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {cyclopsMode ? 'Odysseus' : t('title.nobody')}
          </div>
          <div className="mt-2 mb-5 font-mono caption-text">
            {t('info.connectYourWallet')}
          </div>
          <div className="grid grid-cols-[1fr_1px_1fr] gap-2 justify-items-center items-center self-stretch mt-3">
            <div className="flex flex-col items-stretch text-center">
              <Payments className="self-center mb-4 w-5 h-4 text-center text-icon-secondary" />
              <p className="mb-1 secondary-text">{t('title.holdings')}</p>
              <p className="font-mono title-text">--</p>
            </div>

            <div className="w-[1px] h-10 bg-border-secondary"></div>

            <div className="flex flex-col items-center text-center">
              <Layers className="self-center mb-4 w-5 h-4 text-icon-secondary" />
              <p className="mb-1 secondary-text">{t('title.staked')}</p>
              <p className="font-mono title-text">--</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch p-6 border-t border-t-border-primary">
        <div className="flex flex-row justify-between items-center secondary-text">
          <p>{t('title.membership')}</p>
          <p className="font-mono text-text-primary">--</p>
        </div>

        <div className="flex flex-row justify-between items-center mt-3 secondary-text">
          <p>{t('title.contributions')}</p>
          <p className="font-mono text-text-primary">--</p>
        </div>
      </div>
    </div>
  )
}
