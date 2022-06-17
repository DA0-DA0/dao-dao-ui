import { MinusSmIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'

import { Button } from '../../Button'
import { LogoNoBorder } from '../../Logo'

export interface MemberUnstakeBalanceCardProps {
  daoName: string
  amount: string
  tokenSymbol: string
  onClick: () => void
  loading: boolean
  powerPercent: number
}

export const MemberUnstakeBalanceCard: FC<MemberUnstakeBalanceCardProps> = ({
  daoName,
  tokenSymbol,
  amount,
  onClick,
  loading,
  powerPercent,
}) => (
  <div className="py-4 px-6 w-full rounded-lg border border-default">
    <h2 className="primary-text">{i18n.t('You are a member!', { daoName })}</h2>
    {loading ? (
      <div className="inline-block mt-2 animate-spin-medium">
        <LogoNoBorder />
      </div>
    ) : (
      <p className="mt-2 mb-4 body-text">
        {i18n.t('You have voting power from staked tokens', {
          amount,
          tokenSymbol,
          powerPercent,
        })}
      </p>
    )}
    <div className="flex justify-end">
      <Button onClick={onClick} size="sm" variant="secondary">
        <MinusSmIcon className="w-4 h-4" /> {i18n.t('Unstake tokens')}
      </Button>
    </div>
  </div>
)
