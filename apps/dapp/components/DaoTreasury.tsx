import { useTranslation } from 'react-i18next'

import { Loader, SuspenseLoader } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { TreasuryBalances } from '@/components'

export const DaoTreasury = () => {
  const { t } = useTranslation()
  const {
    ui: { DaoTreasuryFooter },
  } = useVotingModuleAdapter()

  return (
    <div>
      <h2 className="primary-text">{t('title.treasury')}</h2>

      <SuspenseLoader fallback={<Loader />}>
        <TreasuryBalances />
      </SuspenseLoader>

      <DaoTreasuryFooter />
    </div>
  )
}
