import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types'

export type MigrateToOsmosisTokenFactoryIssuerData = {}

export const MigrateToOsmosisTokenFactoryIssuerComponent: ActionComponent =
  () => {
    const { t } = useTranslation()

    return (
      <p className="body-text max-w-prose">
        {t('info.migrateToOsmosisTokenFactoryIssuerExplanation')}
      </p>
    )
  }
