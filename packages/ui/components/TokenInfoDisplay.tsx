import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { Loader as DefaultLoader, InputLabel, LoaderProps } from '@dao-dao/ui'

export interface TokenInfoDisplayProps {
  loadingTokenInfo?: boolean
  tokenInfo?: TokenInfoResponse
  Loader?: ComponentType<LoaderProps>
}

export const TokenInfoDisplay = ({
  loadingTokenInfo,
  tokenInfo,
  Loader = DefaultLoader,
}: TokenInfoDisplayProps) => {
  const { t } = useTranslation()

  return loadingTokenInfo ? (
    <Loader />
  ) : tokenInfo ? (
    <div className="space-y-2">
      <InputLabel name={t('form.tokenInfo')} />
      <pre className="overflow-auto p-2 text-secondary rounded-lg border border-secondary">
        {JSON.stringify(tokenInfo, null, 2)}
      </pre>
    </div>
  ) : null
}
