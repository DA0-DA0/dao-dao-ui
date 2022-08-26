import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowOutward } from '@dao-dao/icons'

import { Button, ButtonLink } from '../Button'

export interface Cw20StakedBalanceVotingProfileMembershipProps {
  className?: string
  tokenSymbol: string
  unstakedTokenBalance: number
  stakedTokenBalance: number
  onStake: () => void
  // TODO: Fetch this from junoswap pools list somehow instead, if possible.
  junoswapHref?: string
  children: ReactNode
}

export const Cw20StakedBalanceVotingProfileMembership = ({
  className,
  tokenSymbol,
  unstakedTokenBalance,
  stakedTokenBalance,
  onStake,
  junoswapHref,
  children,
}: Cw20StakedBalanceVotingProfileMembershipProps) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <div className="link-text">{t('profile.notMember.membership')}</div>
      <p className="mt-1 mb-3 secondary-text">{children}</p>

      <div className="flex flex-row justify-between items-start mb-7 secondary-text">
        <p>{t('profile.notMember.yourHoldings')}</p>
        <div className="flex flex-col gap-1 items-end">
          <p
            className={clsx('font-mono', {
              'text-text-interactive-disabled': unstakedTokenBalance === 0,
            })}
          >
            {t('format.token', { val: unstakedTokenBalance, tokenSymbol })}
          </p>

          <p
            className={clsx('font-mono', {
              'text-text-interactive-disabled': stakedTokenBalance === 0,
            })}
          >
            {t('info.tokensStaked', {
              amount: stakedTokenBalance,
              tokenSymbol,
            })}
          </p>
        </div>
      </div>

      <Button
        className="mb-2 w-full"
        contentContainerClassName="justify-center"
        disabled={unstakedTokenBalance === 0}
        onClick={onStake}
        size="lg"
        variant={unstakedTokenBalance > 0 ? 'primary' : 'secondary'}
      >
        {t('profile.notMember.stakeToken', { tokenSymbol })}
      </Button>

      {junoswapHref && (
        <ButtonLink
          className="w-full"
          contentContainerClassName="justify-center"
          href={junoswapHref}
          size="lg"
          variant="secondary"
        >
          {t('profile.notMember.getTokens')}
          <ArrowOutward height="0.625rem" width="0.625rem" />
        </ButtonLink>
      )}
    </div>
  )
}
