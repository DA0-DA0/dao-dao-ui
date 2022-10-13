import { PlusSmIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/ui'
import { useAddToken } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from '../hooks'

export const DaoTreasuryFooter = () => {
  const { t } = useTranslation()

  const addToken = useAddToken()
  const { governanceTokenAddress } = useGovernanceTokenInfo()

  return addToken ? (
    <Button
      className="mt-4"
      onClick={() => addToken(governanceTokenAddress)}
      variant="secondary"
    >
      <PlusSmIcon className="h-4 w-4" /> {t('button.addToKeplr')}
    </Button>
  ) : null
}
