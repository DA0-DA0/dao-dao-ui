// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { Loader } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { TreasuryBalances } from '@/components'

export const DaoTreasury = () => {
  const { t } = useTranslation()
  const {
    components: { DaoTreasuryFooter },
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
