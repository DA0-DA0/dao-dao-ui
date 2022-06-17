import { FC } from 'react'

import i18n from '@dao-dao/i18n'

import { Button } from '../../Button'
import { LogoNoBorder } from '../../Logo'
import { BalanceIcon } from '../BalanceIcon'

export interface ClaimPendingBalanceCardProps {
  tokenSymbol: string
  amount: string
  onClick: () => void
  loading: boolean
  tokenImageUrl?: string
}

export const ClaimPendingBalanceCard: FC<ClaimPendingBalanceCardProps> = ({
  tokenSymbol,
  amount,
  onClick,
  loading,
  tokenImageUrl,
}) => (
  <div className="py-4 px-6 w-full rounded-lg border border-default">
    {/* TODO: i18n */}
    <h2 className="font-mono caption-text">{`Pending (unclaimed ${tokenSymbol})`}</h2>
    {loading ? (
      <div className="inline-block mt-2 animate-spin-medium">
        <LogoNoBorder />
      </div>
    ) : (
      <div className="flex flex-row flex-wrap gap-2 items-center mt-2 mb-[22px] title-text">
        <BalanceIcon iconURI={tokenImageUrl} />
        {amount} ${tokenSymbol}
      </div>
    )}
    <div className="flex justify-end">
      <Button onClick={onClick} size="sm" variant="secondary">
        {i18n.t('Claim tokens')}
      </Button>
    </div>
  </div>
)
