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

      <p className="title-text text-lg mt-8 mb-2">{t('title.yourDaos')}</p>

      <WalletDaos />
    </div>
  )
}
