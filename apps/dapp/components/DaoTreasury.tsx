import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader, SuspenseLoader } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter/react'

import { TreasuryBalances, useDAOInfoContext } from '@/components'

export const DaoTreasury: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const {
    ui: { DaoTreasuryFooter },
  } = useVotingModuleAdapter()

  return (
    <div>
      <h2 className="primary-text">{t('title.treasury')}</h2>

      <SuspenseLoader fallback={<Loader />}>
        <TreasuryBalances />
      </SuspenseLoader>

      <DaoTreasuryFooter coreAddress={coreAddress} />
    </div>
  )
}
