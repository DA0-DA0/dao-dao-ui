import { FC } from 'react'

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
}) => (
  <div className="p-6 mt-2 w-full rounded-lg border shadow border-base-300">
    <h2 className="font-mono text-sm text-secondary">
      Unclaimed (unstaked ${tokenInfo.symbol})
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
        className="normal-case btn-outline btn btn-xs border-secondary"
        onClick={onClaim}
      >
        Claim
      </button>
    </div>
  </div>
)
