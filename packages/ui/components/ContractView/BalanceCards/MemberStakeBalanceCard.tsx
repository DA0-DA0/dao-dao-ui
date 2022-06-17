import { PlusSmIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'

import { Button } from '../../Button'
import { LogoNoBorder } from '../../Logo'

export interface MemberStakeBalanceCardProps {
  daoName: string
  amount: string
  tokenSymbol: string
  onClick: () => void
  loading: boolean
}

export const MemberStakeBalanceCard: FC<MemberStakeBalanceCardProps> = ({
  daoName,
  tokenSymbol,
  amount,
  onClick,
  loading,
}) => (
  <div className="py-4 px-6 w-full rounded-lg border border-default">
    <h2 className="primary-text">
      {i18n.t('You could have more voting power')}
    </h2>
    {loading ? (
      <div className="inline-block mt-2 animate-spin-medium">
        <LogoNoBorder />
      </div>
    ) : (
      <p className="mt-2 mb-4 body-text">
        {i18n.t('Stake your remaining tokens to gain voting power', {
          amount,
          tokenSymbol,
          daoName,
        })}
      </p>
    )}
    <div className="flex justify-end">
      <Button onClick={onClick} size="sm" variant="secondary">
        <PlusSmIcon className="w-4 h-4" /> {i18n.t('Stake tokens')}
      </Button>
    </div>
  </div>
)
