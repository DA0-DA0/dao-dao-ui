import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types'

export type MigrateMigalooV4TokenFactoryData = {}

export const MigrateMigalooV4TokenFactoryComponent: ActionComponent = () => {
  const { t } = useTranslation()

  return (
    <p className="body-text max-w-prose">
      {t('info.migrateMigalooV4TokenFactoryExplanation')}
    </p>
  )
}
