import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { ArrowOutward } from '@dao-dao/icons'
import { Button, ButtonLink } from '@dao-dao/ui'

export interface ProfileCardNoVoteBecomeMemberInfoProps {
  tokenSymbol: string
  tokenDecimals: number
  unstakedTokenBalance: number
  stakedTokenBalance: number
  daoName: string
  onStake: () => void
  // TODO: Fetch this from junoswap pools list somehow instead, if possible.
  junoswapHref?: string
}

export const ProfileCardNoVoteBecomeMemberInfo = ({
  tokenSymbol,
  tokenDecimals,
  unstakedTokenBalance,
  stakedTokenBalance,
  daoName,
  onStake,
  junoswapHref,
}: ProfileCardNoVoteBecomeMemberInfoProps) => {
  const { t } = useTranslation()

  return (
    <>
      <p className="mb-3 secondary-text">
        {/* If currently has staked tokens but cannot vote (since this info is shown when they cannot vote and instructs them how to become a member), this means they did not have voting power at the time of proposal creation. */}
        {stakedTokenBalance > 0
          ? t('info.memberCantVoteToken', { tokenSymbol, daoName })
          : t('info.stakeYourTokensToJoin', { tokenSymbol, daoName })}
      </p>

      <div className="flex flex-row justify-between items-start mb-7 secondary-text">
        <p>{t('info.yourBalance')}</p>
        <div className="flex flex-col gap-1 items-end">
          <p
            className={clsx('font-mono', {
              'text-text-interactive-disabled': unstakedTokenBalance === 0,
            })}
          >
            {unstakedTokenBalance.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            })}{' '}
            ${tokenSymbol}
          </p>

          <p
            className={clsx('font-mono', {
              'text-text-interactive-disabled': stakedTokenBalance === 0,
            })}
          >
            {t('info.tokensStaked', {
              amount: stakedTokenBalance.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              }),
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
        {t('button.stakeTokenSymbol', { tokenSymbol })}
      </Button>

      {junoswapHref && (
        <ButtonLink
          className="w-full"
          contentContainerClassName="justify-center"
          href={junoswapHref}
          size="lg"
          variant="secondary"
        >
          {t('button.getTokens', { name: 'Junoswap' })}
          <ArrowOutward height="0.625rem" width="0.625rem" />
        </ButtonLink>
      )}
    </>
  )
}
