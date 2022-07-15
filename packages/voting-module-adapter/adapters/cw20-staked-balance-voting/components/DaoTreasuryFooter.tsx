import { PlusSmIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo } from '@dao-dao/state'
import { Button } from '@dao-dao/ui'
import { useAddToken } from '@dao-dao/utils'

import { BaseDaoTreasuryFooterProps } from '../../../types'

export const DaoTreasuryFooter = ({
  coreAddress,
}: BaseDaoTreasuryFooterProps) => {
  const { t } = useTranslation()

  const addToken = useAddToken()
  const { governanceTokenAddress } = useGovernanceTokenInfo(coreAddress)
  if (!governanceTokenAddress) {
    throw new Error(t('error.loadingData'))
  }

  return addToken ? (
    <Button
      className="mt-4"
      onClick={() => addToken(governanceTokenAddress)}
      variant="secondary"
    >
      {t('button.addToKeplr')} <PlusSmIcon className="w-4 h-4" />
    </Button>
  ) : null
}
