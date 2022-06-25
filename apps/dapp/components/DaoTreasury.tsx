import { PlusSmIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { useGovernanceTokenInfo } from '@dao-dao/state'
import { Button, Loader, SuspenseLoader } from '@dao-dao/ui'

import { TreasuryBalances, useDAOInfoContext } from '@/components'
import { useAddToken } from '@/util'

export const DaoTreasury: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const { governanceTokenAddress } = useGovernanceTokenInfo(coreAddress)
  const addToken = useAddToken()

  return (
    <div>
      <h2 className="primary-text">{t('title.treasury')}</h2>
      <SuspenseLoader fallback={<Loader />}>
        <TreasuryBalances />
      </SuspenseLoader>

      {governanceTokenAddress && (
        <Button
          className="mt-4"
          onClick={() => addToken(governanceTokenAddress)}
          variant="secondary"
        >
          {t('button.addToKeplr')} <PlusSmIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
