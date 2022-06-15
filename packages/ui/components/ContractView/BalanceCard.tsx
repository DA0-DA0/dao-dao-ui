import { FC } from 'react'

import i18n from '@dao-dao/i18n'

import { Button } from '../Button'
import { LogoNoBorder } from '../Logo'
import { BalanceIcon } from './BalanceIcon'

export interface BalanceCardProps {
  denom: string
  title: string
  amount: string
  onManage: () => void
  loading: boolean
}

export const BalanceCard: FC<BalanceCardProps> = ({
  denom,
  title,
  amount,
  onManage,
  loading,
}) => (
  <div className="py-4 px-6 w-full rounded-lg border border-default">
    <h2 className="font-mono caption-text">{title}</h2>
    {loading ? (
      <div className="inline-block mt-2 animate-spin-medium">
        <LogoNoBorder />
      </div>
    ) : (
      <div className="flex flex-row flex-wrap gap-2 items-center mt-2 mb-[22px] title-text">
        <BalanceIcon />
        {amount} ${denom}
      </div>
    )}
    <div className="flex justify-end">
      <Button onClick={onManage} size="sm" variant="secondary">
        {i18n.t('Manage staking')}
      </Button>
    </div>
  </div>
)
