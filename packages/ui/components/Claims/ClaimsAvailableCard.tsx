import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { TokenInfoResponse } from '@dao-dao/types/contracts/stake-cw20'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { LogoNoBorder } from '../Logo'

export interface ClaimsAvailableCardProps {
  available: number
  tokenInfo: TokenInfoResponse
  onClaim: () => void
  loading: boolean
}

export const ClaimsAvailableCard: FC<ClaimsAvailableCardProps> = ({
  available,
  tokenInfo,
  onClaim,
  loading,
}) => {
  const { t } = useTranslation()

  return (
    <div className="p-6 mt-2 w-full rounded-lg border shadow border-base-300">
      <h2 className="font-mono text-sm text-secondary">
        {t('title.unclaimed')} (
        {t('info.unstakedTokens', { tokenSymbol: tokenInfo.symbol })})
      </h2>
      {loading ? (
        <div className="inline-block mt-2 animate-spin-medium">
          <LogoNoBorder />
        </div>
      ) : (
        <p className="mt-2 font-bold">
          {convertMicroDenomToDenomWithDecimals(available, tokenInfo.decimals)}$
          {tokenInfo.symbol}
        </p>
      )}
      <div className="flex justify-end">
        <button
          className="normal-case btn-outline btn-xs border-secondary btn"
          onClick={onClaim}
        >
          {t('button.claim')}
        </button>
      </div>
    </div>
  )
}
