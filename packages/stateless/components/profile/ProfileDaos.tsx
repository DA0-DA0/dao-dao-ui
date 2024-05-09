import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { StatefulWalletDaosProps } from '@dao-dao/types'

export type ProfileDaosProps = {
  ProfileFeed: ComponentType
  WalletDaos: ComponentType<StatefulWalletDaosProps>
}

export const ProfileDaos = ({ ProfileFeed, WalletDaos }: ProfileDaosProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <ProfileFeed />

      <div className="flex flex-col gap-1 mt-8 mb-3">
        <p className="title-text text-lg">{t('title.yourDaos')}</p>
        <p className="caption-text">{t('info.yourDaosDescription')}</p>
      </div>

      <WalletDaos />
    </div>
  )
}
